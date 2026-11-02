import React, { useState, useEffect, useRef } from 'react';
import type { Outlet, WebMember, ChatRoom, ChatMessage, ChatKnowledge } from '../types';
import type { User } from '@supabase/supabase-js';
import {
  supabase,
  fetchMemberActiveChatRoom,
  createChatRoom,
  fetchChatMessages,
  sendChatMessage,
  updateChatRoom,
  fetchChatKnowledge
} from '../lib/supabaseClient';
import { useLanguage } from '../lib/i18n';
import {
  MessageSquare,
  X,
  Send,
  Building2,
  Headphones,
  Bot,
  User as UserIcon,
  Clock,
  Sparkles,
  ChevronDown,
  HelpCircle,
  ExternalLink,
  Phone,
  RefreshCw
} from 'lucide-react';

interface FloatingChatWidgetProps {
  currentUser: User | null;
  memberProfile: WebMember | null;
  outlets: Outlet[];
  holdingContact?: Outlet | null;
  onLoginGoogle: () => void;
}

export const FloatingChatWidget: React.FC<FloatingChatWidgetProps> = ({
  currentUser,
  memberProfile,
  outlets,
  holdingContact,
  onLoginGoogle
}) => {
  const { language, t, getLocalizedText } = useLanguage();

  const [isOpen, setIsOpen] = useState(false);
  const [activeRoom, setActiveRoom] = useState<ChatRoom | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputText, setInputText] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [isLoadingMessages, setIsLoadingMessages] = useState(false);
  const [knowledgeList, setKnowledgeList] = useState<ChatKnowledge[]>([]);
  const [showFaqView, setShowFaqView] = useState(false);
  const [selectedOutletCode, setSelectedOutletCode] = useState<string>('');
  const [unreadCount, setUnreadCount] = useState<number>(0);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const rawHoldingWa = holdingContact?.no_wa || '082367867000';
  const cleanHoldingWa = rawHoldingWa.replace(/[^0-9]/g, '').replace(/^0/, '62');

  const displayName =
    memberProfile?.full_name ||
    currentUser?.user_metadata?.full_name ||
    currentUser?.email?.split('@')[0] ||
    'Member';

  // 1. Fetch active chat room when currentUser is present
  useEffect(() => {
    if (!currentUser) {
      setActiveRoom(null);
      setMessages([]);
      return;
    }

    let isMounted = true;

    async function loadRoom() {
      if (!currentUser) return;
      const room = await fetchMemberActiveChatRoom({
        memberId: memberProfile?.id || null,
        authUserId: currentUser.id
      });
      if (isMounted) {
        setActiveRoom(room);
        if (room) {
          loadMessages(room.id);
        }
      }
    }

    loadRoom();

    return () => {
      isMounted = false;
    };
  }, [currentUser, memberProfile?.id]);

  // 2. Fetch Chat Knowledge Base (FAQ)
  useEffect(() => {
    fetchChatKnowledge().then(setKnowledgeList);
  }, []);

  // 3. Load messages for the active room
  const loadMessages = async (roomId: string) => {
    setIsLoadingMessages(true);
    const msgs = await fetchChatMessages(roomId);
    setMessages(msgs);
    setIsLoadingMessages(false);
    scrollToBottom();
  };

  const scrollToBottom = () => {
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  // 4. Realtime Subscription on web_chat_messages for the active room
  useEffect(() => {
    if (!activeRoom?.id) return;

    const channel = supabase
      .channel(`web_chat_room:${activeRoom.id}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'web_chat_messages',
          filter: `room_id=eq.${activeRoom.id}`
        },
        (payload) => {
          const newMsg = payload.new as ChatMessage;
          setMessages((prev) => {
            if (prev.some((m) => m.id === newMsg.id)) return prev;
            return [...prev, newMsg];
          });
          scrollToBottom();

          // Increment unread badge if widget is closed
          if (!isOpen && newMsg.sender_type !== 'MEMBER') {
            setUnreadCount((c) => c + 1);
          }
        }
      )
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'web_chat_rooms',
          filter: `id=eq.${activeRoom.id}`
        },
        (payload) => {
          const updated = payload.new as ChatRoom;
          setActiveRoom(updated);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [activeRoom?.id, isOpen]);

  // Reset unread counter when widget is opened
  const handleToggleOpen = () => {
    if (!isOpen) {
      setUnreadCount(0);
      setIsOpen(true);
      scrollToBottom();
    } else {
      setIsOpen(false);
    }
  };

  // 5. Ensure an active room exists or create a new one
  const getOrCreateRoom = async (category: 'RESERVASI' | 'HOLDING' | 'GENERAL' = 'GENERAL'): Promise<ChatRoom | null> => {
    if (!currentUser) return null;

    if (activeRoom && activeRoom.status !== 'RESOLVED') {
      return activeRoom;
    }

    const newRoom = await createChatRoom({
      member_id: memberProfile?.id || null,
      auth_user_id: currentUser.id,
      member_name: displayName,
      member_phone: memberProfile?.phone_wa || null,
      category,
      kode_outlet: selectedOutletCode || null
    });

    if (newRoom) {
      setActiveRoom(newRoom);
      // Send greeting message from Bot
      const greetingMsg =
        language === 'en'
          ? `Hello ${displayName}! Welcome to Zen Family Spa & Reflexology Concierge. How can we assist your relaxation journey today?`
          : `Halo Kak ${displayName}! Selamat datang di Zen Family Spa & Reflexology Concierge. Ada yang bisa kami bantu untuk relaksasi Anda hari ini?`;

      await sendChatMessage({
        room_id: newRoom.id,
        sender_type: 'BOT',
        sender_name: 'Zen Assistant',
        message_text: greetingMsg
      });

      await loadMessages(newRoom.id);
    }

    return newRoom;
  };

  // 6. Handle User Action: Choose Reservation Branch
  const handleSelectReservation = async () => {
    if (!selectedOutletCode) return;
    const room = await getOrCreateRoom('RESERVASI');
    if (!room) return;

    const chosenOutlet = outlets.find((o) => o.kode_outlet === selectedOutletCode);
    const outletName = chosenOutlet?.name_outlet || `Cabang ${selectedOutletCode}`;

    // Update room category & route to outlet
    await updateChatRoom(room.id, {
      category: 'RESERVASI',
      kode_outlet: selectedOutletCode,
      unread_by_outlet: true,
      status: 'WAITING_STAFF'
    });

    // Post member message
    const memberTxt =
      language === 'en'
        ? `I would like to make an appointment reservation at ${outletName}.`
        : `Saya ingin reservasi jadwal perawatan di cabang ${outletName}.`;

    await sendChatMessage({
      room_id: room.id,
      sender_type: 'MEMBER',
      sender_name: displayName,
      sender_id: currentUser?.id,
      message_text: memberTxt
    });

    // Bot confirmation reply
    const botReply =
      language === 'en'
        ? `Thank you! Your reservation inquiry has been forwarded directly to our reception staff at ${outletName}. They have been notified on their desktop system and will reply shortly.`
        : `Baik Kak! Permintaan reservasi Anda untuk cabang ${outletName} telah diteruskan langsung ke resepsionis kami. Komputer resepsionis cabang telah menerima notifikasi dan staf kami akan segera merespons jadwal yang tersedia.`;

    await sendChatMessage({
      room_id: room.id,
      sender_type: 'BOT',
      sender_name: 'Zen Assistant',
      message_text: botReply
    });

    setShowFaqView(false);
  };

  // 7. Handle User Action: Talk to Human / CS Holding
  const handleConnectHolding = async () => {
    const room = await getOrCreateRoom('HOLDING');
    if (!room) return;

    await updateChatRoom(room.id, {
      category: 'HOLDING',
      unread_by_admin: true,
      status: 'WAITING_STAFF'
    });

    const memberTxt =
      language === 'en'
        ? 'I would like to speak with Zen Customer Care Support.'
        : 'Saya ingin terhubung dengan layanan pelanggan Zen Customer Care.';

    await sendChatMessage({
      room_id: room.id,
      sender_type: 'MEMBER',
      sender_name: displayName,
      sender_id: currentUser?.id,
      message_text: memberTxt
    });

    const botReply =
      language === 'en'
        ? 'You are now connected with Zen Central Customer Care. Our support staff has been alerted and will assist you promptly.'
        : 'Pesan Anda telah terhubung dengan Tim Customer Care Holding Zen Family Spa. Staf kami akan segera merespons pertanyaan Anda di sini.';

    await sendChatMessage({
      room_id: room.id,
      sender_type: 'BOT',
      sender_name: 'Zen Assistant',
      message_text: botReply
    });

    setShowFaqView(false);
  };

  // 8. Handle Send Custom Message
  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = inputText.trim();
    if (!trimmed || isSending) return;

    setIsSending(true);
    setInputText('');

    const room = await getOrCreateRoom();
    if (room) {
      // 1. Send member message
      await sendChatMessage({
        room_id: room.id,
        sender_type: 'MEMBER',
        sender_name: displayName,
        sender_id: currentUser?.id,
        message_text: trimmed
      });

      // 2. Intelligent Auto-Answer check from Knowledge Base (if room in BOT mode)
      if (room.status === 'BOT' || room.status === 'WAITING_STAFF') {
        const lowerInput = trimmed.toLowerCase();
        const matchedFaq = knowledgeList.find((faq) => {
          const kw = (faq.keyword || '').toLowerCase();
          const kwEn = (faq.keyword_en || '').toLowerCase();
          const tokens = [...kw.split(','), ...kwEn.split(',')].map((s) => s.trim()).filter(Boolean);
          return tokens.some((token) => lowerInput.includes(token));
        });

        if (matchedFaq) {
          const answerText = getLocalizedText(matchedFaq.answer, matchedFaq.answer_en);
          await sendChatMessage({
            room_id: room.id,
            sender_type: 'BOT',
            sender_name: 'Zen Assistant',
            message_text: answerText
          });
        }
      }
    }

    setIsSending(false);
    inputRef.current?.focus();
  };

  // 9. Send FAQ answer when clicked in FAQ list
  const handleSelectFaqItem = async (faq: ChatKnowledge) => {
    const room = await getOrCreateRoom();
    if (!room) return;

    const q = getLocalizedText(faq.question, faq.question_en);
    const a = getLocalizedText(faq.answer, faq.answer_en);

    await sendChatMessage({
      room_id: room.id,
      sender_type: 'MEMBER',
      sender_name: displayName,
      sender_id: currentUser?.id,
      message_text: q
    });

    await sendChatMessage({
      room_id: room.id,
      sender_type: 'BOT',
      sender_name: 'Zen Assistant',
      message_text: a
    });

    setShowFaqView(false);
  };

  // Resolve current chat and start new
  const handleStartNewChat = async () => {
    if (activeRoom) {
      await updateChatRoom(activeRoom.id, { status: 'RESOLVED' });
    }
    setActiveRoom(null);
    setMessages([]);
    setShowFaqView(false);
    setSelectedOutletCode('');
  };

  const getSenderBadge = (msg: ChatMessage) => {
    if (msg.sender_type === 'BOT') {
      return (
        <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-[#6E8027] bg-[#889D35]/15 px-2 py-0.5 rounded-full">
          <Bot className="w-2.5 h-2.5" /> {t.chat.botBadge}
        </span>
      );
    }
    if (msg.sender_type === 'OUTLET_STAFF') {
      const outlet = outlets.find((o) => o.kode_outlet === activeRoom?.kode_outlet);
      const outletName = outlet?.name_outlet || t.chat.outletStaffBadge;
      return (
        <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-amber-800 bg-amber-100 px-2 py-0.5 rounded-full">
          <Building2 className="w-2.5 h-2.5" /> {outletName}
        </span>
      );
    }
    if (msg.sender_type === 'WEB_ADMIN') {
      return (
        <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-blue-800 bg-blue-100 px-2 py-0.5 rounded-full">
          <Headphones className="w-2.5 h-2.5" /> {t.chat.holdingStaffBadge}
        </span>
      );
    }
    return null;
  };

  return (
    <>
      {/* 1. Floating Launcher Button */}
      <div className="fixed bottom-6 right-6 z-50 flex items-center">
        {!isOpen && (
          <button
            type="button"
            onClick={handleToggleOpen}
            aria-label="Buka Live Chat Concierge"
            className="group relative flex items-center gap-3 bg-[#889D35] hover:bg-[#6E8027] text-white py-3.5 px-5 rounded-full shadow-2xl hover:shadow-green-900/30 transition-all duration-300 transform hover:scale-105 active:scale-95 cursor-pointer border border-white/20"
          >
            <div className="relative">
              <MessageSquare className="w-5 h-5 fill-current" />
              {unreadCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center animate-bounce">
                  {unreadCount}
                </span>
              )}
              {unreadCount === 0 && (
                <>
                  <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-white rounded-full animate-ping" />
                  <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-white rounded-full" />
                </>
              )}
            </div>
            <div className="flex flex-col text-left">
              <span className="text-[10px] uppercase font-bold tracking-widest leading-tight text-white/90">
                {t.chat.title}
              </span>
              <span className="text-xs font-semibold leading-tight">
                {language === 'en' ? 'Live Chat Support' : 'Live Chat Resepsionis'}
              </span>
            </div>
          </button>
        )}
      </div>

      {/* 2. Floating Chat Window Panel */}
      {isOpen && (
        <div className="fixed inset-x-3 bottom-4 sm:inset-x-auto sm:right-6 sm:bottom-6 z-50 sm:w-[410px] h-[580px] max-h-[88vh] bg-[#F8F5F1] rounded-3xl shadow-2xl border border-[#D2C0A7]/80 flex flex-col overflow-hidden animate-fadeIn font-sans selection:bg-[#889D35] selection:text-white">
          {/* Header */}
          <div className="bg-[#3C3C32] text-white p-4 flex items-center justify-between border-b border-[#4A4A3E]">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[#889D35] flex items-center justify-center text-white shadow-xs">
                <Sparkles className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <h3 className="font-serif font-bold text-base tracking-wide flex items-center gap-2">
                  {t.chat.title}
                  <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                </h3>
                <p className="text-[11px] text-[#D2C0A7] flex items-center gap-1">
                  <Clock className="w-3 h-3 text-[#889D35]" /> {t.chat.subtitleOnline}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              {currentUser && activeRoom && (
                <button
                  type="button"
                  onClick={handleStartNewChat}
                  title={t.chat.startNewChat}
                  className="p-1.5 text-[#D2C0A7] hover:text-white hover:bg-white/10 rounded-lg transition"
                >
                  <RefreshCw className="w-4 h-4" />
                </button>
              )}
              <button
                type="button"
                onClick={handleToggleOpen}
                aria-label="Tutup Chat"
                className="p-1.5 text-[#D2C0A7] hover:text-white hover:bg-white/10 rounded-lg transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Body Content Area */}
          <div className="flex-1 flex flex-col overflow-hidden bg-[#FAF7F2]">
            {/* Condition A: Guest User (Not logged in) */}
            {!currentUser ? (
              <div className="flex-1 p-6 flex flex-col justify-between items-center text-center">
                <div className="my-auto space-y-4">
                  <div className="w-16 h-16 rounded-full bg-[#889D35]/15 text-[#889D35] flex items-center justify-center mx-auto shadow-inner">
                    <UserIcon className="w-8 h-8" />
                  </div>
                  <h4 className="font-serif text-lg font-bold text-[#3C3C32]">
                    {t.chat.loginRequiredTitle}
                  </h4>
                  <p className="text-xs text-[#717163] leading-relaxed max-w-xs mx-auto">
                    {t.chat.loginRequiredDesc}
                  </p>

                  <button
                    type="button"
                    onClick={onLoginGoogle}
                    className="w-full py-3 px-4 bg-[#889D35] hover:bg-[#6E8027] text-white rounded-xl font-semibold text-xs tracking-wide shadow-md transition transform active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>{t.chat.loginGoogleBtn}</span>
                  </button>
                </div>

                <div className="w-full pt-4 border-t border-[#E5DACB]/70">
                  <p className="text-[11px] text-[#717163] mb-2">{t.chat.chatViaWa}:</p>
                  <a
                    href={`https://wa.me/${cleanHoldingWa}?text=Halo%20Concierge%20Zen%20Family%20Spa,%20saya%20ingin%20konsultasi%20layanan`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 text-xs font-semibold text-green-700 bg-green-50 hover:bg-green-100 py-2.5 px-3 rounded-xl border border-green-200 transition"
                  >
                    <Phone className="w-3.5 h-3.5 text-green-600" />
                    <span>WhatsApp Hotline: {rawHoldingWa}</span>
                    <ExternalLink className="w-3 h-3 text-green-600 ml-1" />
                  </a>
                </div>
              </div>
            ) : (
              /* Condition B: Member Logged In */
              <div className="flex-1 flex flex-col overflow-hidden">
                {/* Active Room Status Subheader */}
                {activeRoom && (
                  <div className="bg-[#EFE8DD] px-4 py-2 text-xs flex items-center justify-between border-b border-[#D2C0A7]/50 text-[#3C3C32]">
                    <div className="flex items-center gap-1.5 truncate">
                      {activeRoom.category === 'RESERVASI' ? (
                        <Building2 className="w-3.5 h-3.5 text-[#889D35]" />
                      ) : activeRoom.category === 'HOLDING' ? (
                        <Headphones className="w-3.5 h-3.5 text-blue-600" />
                      ) : (
                        <Bot className="w-3.5 h-3.5 text-[#889D35]" />
                      )}
                      <span className="font-semibold truncate">
                        {activeRoom.category === 'RESERVASI' && activeRoom.kode_outlet
                          ? outlets.find((o) => o.kode_outlet === activeRoom.kode_outlet)?.name_outlet ||
                            `Cabang ${activeRoom.kode_outlet}`
                          : activeRoom.category === 'HOLDING'
                          ? 'Customer Care Holding'
                          : 'Zen Smart Assistant'}
                      </span>
                    </div>

                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        activeRoom.status === 'ACTIVE'
                          ? 'bg-green-100 text-green-800'
                          : activeRoom.status === 'WAITING_STAFF'
                          ? 'bg-amber-100 text-amber-800 animate-pulse'
                          : activeRoom.status === 'RESOLVED'
                          ? 'bg-gray-200 text-gray-700'
                          : 'bg-[#889D35]/15 text-[#6E8027]'
                      }`}
                    >
                      {activeRoom.status === 'ACTIVE'
                        ? t.chat.statusActive
                        : activeRoom.status === 'WAITING_STAFF'
                        ? t.chat.statusWaiting
                        : activeRoom.status === 'RESOLVED'
                        ? t.chat.statusResolved
                        : 'BOT'}
                    </span>
                  </div>
                )}

                {/* FAQ List Modal Overlay inside chat */}
                {showFaqView ? (
                  <div className="flex-1 p-4 overflow-y-auto space-y-3">
                    <div className="flex items-center justify-between pb-2 border-b border-[#D2C0A7]">
                      <h4 className="font-serif font-bold text-sm text-[#3C3C32] flex items-center gap-1.5">
                        <HelpCircle className="w-4 h-4 text-[#889D35]" />
                        {t.chat.faqTitle}
                      </h4>
                      <button
                        type="button"
                        onClick={() => setShowFaqView(false)}
                        className="text-xs text-[#717163] hover:text-[#3C3C32] font-semibold"
                      >
                        {t.chat.backToMenu}
                      </button>
                    </div>

                    <div className="space-y-2">
                      {knowledgeList.map((faq) => {
                        const question = getLocalizedText(faq.question, faq.question_en);
                        return (
                          <button
                            key={faq.id}
                            type="button"
                            onClick={() => handleSelectFaqItem(faq)}
                            className="w-full text-left p-3 rounded-xl bg-white border border-[#E5DACB] hover:border-[#889D35] shadow-2xs hover:shadow-xs transition text-xs text-[#3C3C32] flex items-center justify-between gap-2 group cursor-pointer"
                          >
                            <span className="font-medium group-hover:text-[#889D35] transition">
                              {question}
                            </span>
                            <ChevronDown className="w-3.5 h-3.5 -rotate-90 text-[#717163] shrink-0" />
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ) : (
                  /* Standard Chat Messages List */
                  <div className="flex-1 p-4 overflow-y-auto space-y-3.5">
                    {isLoadingMessages && (
                      <div className="text-center py-2 text-[10px] text-[#717163] animate-pulse">
                        {language === 'en' ? 'Loading messages...' : 'Memuat pesan...'}
                      </div>
                    )}
                    {/* Welcome Greeting Card if no messages yet */}
                    {messages.length === 0 && (
                      <div className="space-y-3">
                        <div className="bg-white p-4 rounded-2xl border border-[#E5DACB] shadow-2xs text-left">
                          <div className="flex items-center gap-2 mb-1.5">
                            <div className="w-6 h-6 rounded-full bg-[#889D35] text-white flex items-center justify-center text-xs">
                              <Bot className="w-3.5 h-3.5" />
                            </div>
                            <span className="text-xs font-bold text-[#3C3C32]">Zen Assistant</span>
                          </div>
                          <p className="text-xs text-[#717163] leading-relaxed mb-3">
                            {t.chat.greetingDesc}
                          </p>

                          {/* Quick Actions List */}
                          <div className="space-y-2 pt-2 border-t border-[#E5DACB]/50">
                            {/* Option 1: Branch Reservation Dropdown */}
                            <div className="space-y-1.5">
                              <label className="text-[11px] font-bold text-[#3C3C32] flex items-center gap-1">
                                <Building2 className="w-3.5 h-3.5 text-[#889D35]" />
                                {t.chat.quickReservation}
                              </label>
                              <div className="flex gap-1.5">
                                <select
                                  value={selectedOutletCode}
                                  onChange={(e) => setSelectedOutletCode(e.target.value)}
                                  className="flex-1 text-xs bg-[#F8F5F1] border border-[#D2C0A7] rounded-xl px-2.5 py-2 text-[#3C3C32] focus:outline-none focus:ring-1 focus:ring-[#889D35]"
                                >
                                  <option value="">{t.chat.selectOutletPlaceholder}</option>
                                  {outlets.map((o) => (
                                    <option key={o.kode_outlet} value={o.kode_outlet}>
                                      {o.name_outlet} ({o.city})
                                    </option>
                                  ))}
                                </select>
                                <button
                                  type="button"
                                  disabled={!selectedOutletCode}
                                  onClick={handleSelectReservation}
                                  className="px-3 py-2 bg-[#889D35] hover:bg-[#6E8027] disabled:opacity-50 text-white text-xs font-semibold rounded-xl shadow-xs transition shrink-0 cursor-pointer"
                                >
                                  {t.chat.sendBtn}
                                </button>
                              </div>
                            </div>

                            {/* Option 2: FAQ Knowledge Base */}
                            <button
                              type="button"
                              onClick={() => setShowFaqView(true)}
                              className="w-full text-left p-2.5 rounded-xl bg-[#F8F5F1] hover:bg-[#889D35]/10 border border-[#D2C0A7] transition text-xs font-semibold text-[#3C3C32] flex items-center justify-between cursor-pointer"
                            >
                              <span className="flex items-center gap-1.5">
                                <HelpCircle className="w-3.5 h-3.5 text-[#889D35]" />
                                {t.chat.quickFaq}
                              </span>
                              <ChevronDown className="w-3.5 h-3.5 -rotate-90 text-[#717163]" />
                            </button>

                            {/* Option 3: Talk to Human / CS Holding */}
                            <button
                              type="button"
                              onClick={handleConnectHolding}
                              className="w-full text-left p-2.5 rounded-xl bg-[#F8F5F1] hover:bg-blue-50 border border-[#D2C0A7] transition text-xs font-semibold text-[#3C3C32] flex items-center justify-between cursor-pointer"
                            >
                              <span className="flex items-center gap-1.5">
                                <Headphones className="w-3.5 h-3.5 text-blue-600" />
                                {t.chat.quickHolding}
                              </span>
                              <ChevronDown className="w-3.5 h-3.5 -rotate-90 text-[#717163]" />
                            </button>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Messages Feed */}
                    {messages.map((msg) => {
                      const isMe = msg.sender_type === 'MEMBER';
                      const badge = getSenderBadge(msg);

                      return (
                        <div
                          key={msg.id}
                          className={`flex flex-col ${isMe ? 'items-end' : 'items-start'} space-y-1`}
                        >
                          {!isMe && badge && <div className="ml-1">{badge}</div>}

                          <div
                            className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-xs shadow-2xs leading-relaxed ${
                              isMe
                                ? 'bg-[#889D35] text-white rounded-br-xs'
                                : 'bg-white text-[#3C3C32] border border-[#E5DACB] rounded-bl-xs'
                            }`}
                          >
                            <p className="whitespace-pre-line">{msg.message_text}</p>
                          </div>

                          <span className="text-[9px] text-[#717163] px-1">
                            {new Date(msg.created_at).toLocaleTimeString([], {
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </span>
                        </div>
                      );
                    })}

                    <div ref={messagesEndRef} />
                  </div>
                )}

                {/* Direct WA Hotline Quick Bar */}
                <div className="bg-[#EFE8DD]/60 px-3 py-1.5 flex items-center justify-between text-[11px] text-[#717163] border-t border-[#E5DACB]">
                  <span className="truncate">
                    {language === 'en' ? 'Need immediate assistance?' : 'Butuh info darurat?'}
                  </span>
                  <a
                    href={`https://wa.me/${cleanHoldingWa}?text=Halo%20Zen%20Family%20Spa,%20saya%20member%20${encodeURIComponent(
                      displayName
                    )}%20ingin%20bertanya`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-green-700 hover:text-green-800 font-bold flex items-center gap-1 shrink-0"
                  >
                    <Phone className="w-3 h-3 text-green-600" />
                    <span>WhatsApp</span>
                  </a>
                </div>

                {/* Input Bar Form */}
                <form
                  onSubmit={handleSendMessage}
                  className="p-3 bg-white border-t border-[#E5DACB] flex items-center gap-2"
                >
                  <input
                    ref={inputRef}
                    type="text"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder={t.chat.inputPlaceholder}
                    disabled={isSending}
                    className="flex-1 bg-[#F8F5F1] text-xs text-[#3C3C32] placeholder-[#717163] px-3.5 py-2.5 rounded-full border border-[#D2C0A7] focus:outline-none focus:ring-1 focus:ring-[#889D35] focus:border-[#889D35] transition"
                  />

                  <button
                    type="submit"
                    disabled={!inputText.trim() || isSending}
                    className="w-9 h-9 rounded-full bg-[#889D35] hover:bg-[#6E8027] disabled:opacity-40 text-white flex items-center justify-center transition shadow-xs cursor-pointer shrink-0"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};
