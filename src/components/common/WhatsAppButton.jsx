import { MessageCircle } from 'lucide-react';

const WhatsAppButton = () => {
  const phoneNumber = "542211234567"; // Replace with real number
  const message = encodeURIComponent("Hola! Quisiera consultar por un servicio de reparación.");
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contactar por WhatsApp"
      className="fixed bottom-8 right-8 z-[100] group"
    >
      {/* Pulse effect */}
      <div className="absolute inset-0 bg-[#25D366] rounded-full animate-ping opacity-20 group-hover:opacity-40"></div>
      
      <div className="relative w-16 h-16 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 group-hover:scale-110 group-hover:-rotate-12 border-4 border-white/20">
        <MessageCircle size={32} />
      </div>
      
      {/* Label tooltip */}
      <div className="absolute right-20 top-1/2 -translate-y-1/2 bg-white text-dark-deep px-4 py-2 rounded-xl border border-neutral-200 shadow-xl opacity-0 translate-x-4 pointer-events-none group-hover:opacity-100 group-hover:translate-x-0 transition-all font-black text-[10px] uppercase tracking-widest whitespace-nowrap">
        Escribinos por WhatsApp
      </div>
    </a>
  );
};

export default WhatsAppButton;
