import { MapPin, Navigation, Compass } from 'lucide-react';

const LocationSection = () => {
  const address = "AGP, C. 46 392, B1900 La Plata, Provincia de Buenos Aires";
  const officialEmbedUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3271.74507025883!2d-57.95475148421071!3d-34.92215288220038!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bd8e08d6c7c00f%3A0x6b82b9e1e0a2d3b2!2sAGP%20C.%2046%20392%2C%20B1900%20La%20Plata%2C%20Provincia%20de%20Buenos%20Aires%2C%20Argentina!5e0!3m2!1sen!2sus!4v1678886400000!5m2!1sen!2sus";

  return (
    <section id="ubicacion" className="bg-neutral-warm relative overflow-hidden flex flex-col lg:flex-row min-h-[600px] border-y border-neutral-200/50">
      <div className="bg-grain"></div>
      
      {/* Information Block - Left/Top (40%) */}
      <div className="lg:w-[40%] p-12 md:p-20 flex flex-col justify-center relative">
        {/* Technical Watermark */}
        <div className="absolute top-10 left-10 text-[100px] font-black text-dark-deep/[0.03] select-none pointer-events-none">
          LOC.
        </div>

        <div className="relative z-10 space-y-12">
          <div className="inline-flex items-center gap-3">
            <div className="w-8 h-px bg-primary-600"></div>
            <span className="text-[11px] font-black uppercase tracking-[0.5em] text-primary-600">Encuéntranos</span>
          </div>

          <div className="space-y-6">
            <h2 className="text-4xl md:text-5xl font-black text-dark-deep uppercase tracking-tighter leading-none">
              NUESTRO <br/> TALLER
            </h2>
            <p className="text-lg text-neutral-500 font-bold max-w-sm leading-snug">
              Visítanos en el corazón de La Plata. Un espacio donde la tradición se encuentra con la precisión técnica.
            </p>
          </div>

          <div className="space-y-8 pt-8 border-t border-neutral-200">
            <div className="flex items-start gap-4">
              <div className="mt-1 text-primary-600">
                <MapPin size={24} />
              </div>
              <div>
                <span className="text-[10px] font-black uppercase tracking-widest text-neutral-400 block mb-1">Dirección Técnica</span>
                <p className="text-xl font-bold text-dark-deep leading-tight">
                  Calle 46 392, B1900 <br/>
                  La Plata, Buenos Aires.
                </p>
              </div>
            </div>

            <div className="flex gap-4 pt-4">
              <a 
                href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(address)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-dark-deep text-white px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-primary-600 hover:-translate-y-1 transition-all shadow-xl active:scale-95 group"
              >
                <Navigation size={18} className="group-hover:rotate-12 transition-transform" />
                Cómo llegar
              </a>
              <div className="w-14 h-14 border border-neutral-200 rounded-2xl flex items-center justify-center text-dark-deep opacity-30">
                <Compass size={24} className="animate-pulse" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Map Block - Right/Bottom (60%) */}
      <div className="lg:w-[60%] relative min-h-[400px] lg:min-h-0 border-l border-neutral-200">
        <div className="absolute inset-0 bg-neutral-200">
          <iframe
            src={officialEmbedUrl}
            width="100%"
            height="100%"
            style={{ border: 0, filter: 'grayscale(0.2) contrast(1.1)' }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Google Maps"
            className="w-full h-full"
          ></iframe>
        </div>
        
        {/* Architectural Overlay Label */}
        <div className="absolute bottom-10 right-10 bg-white/90 backdrop-blur-md p-4 border border-neutral-200 hidden md:block z-20 shadow-2xl skew-x-[-10deg]">
          <p className="text-[9px] font-black uppercase tracking-[0.3em] text-dark-deep/50 whitespace-nowrap">
            COORD_34.9221_S / 57.9547_W
          </p>
        </div>
      </div>
    </section>
  );
};

export default LocationSection;
