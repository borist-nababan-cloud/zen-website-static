import React from 'react';
import type { Outlet } from '../types';
import { MessageSquare } from 'lucide-react';

interface FloatingWhatsAppProps {
  holdingContact?: Outlet | null;
}

export const FloatingWhatsApp: React.FC<FloatingWhatsAppProps> = ({ holdingContact }) => {
  const rawWa = holdingContact?.no_wa || '082367867000';
  const cleanWa = rawWa.replace(/[^0-9]/g, '').replace(/^0/, '62');

  return (
    <a
      href={`https://wa.me/${cleanWa}?text=Halo%20Concierge%20Zen%20Family%20Spa,%20saya%20ingin%20bertanya%20seputar%20layanan%20dan%20reservasi`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat WhatsApp Concierge Zen Family Spa"
      className="fixed bottom-6 right-6 z-50 group flex items-center gap-2.5 bg-[#25D366] hover:bg-[#1EBE5D] text-white py-3 px-4 rounded-full shadow-2xl hover:shadow-green-500/30 transition-all duration-300 transform hover:scale-105 active:scale-95"
    >
      <div className="relative">
        <MessageSquare className="w-5 h-5 fill-current" />
        <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-white rounded-full animate-ping" />
        <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-white rounded-full" />
      </div>
      <div className="hidden sm:flex flex-col text-left">
        <span className="text-[10px] uppercase font-bold tracking-wider leading-tight text-white/90">
          Concierge Spa
        </span>
        <span className="text-xs font-semibold leading-tight">
          Konsultasi WhatsApp
        </span>
      </div>
    </a>
  );
};
