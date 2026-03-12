import { MapPin, Navigation, Compass } from 'lucide-react';

const LocationSection = () => {
  const address = "AGP, C. 46 392, B1900 La Plata, Provincia de Buenos Aires";
  const officialEmbedUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3271.74507025883!2d-57.95475148421071!3d-34.92215288220038!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bd8e08d6c7c00f%3A0x6b82b9e1e0a2d3b2!2sAGP%20C.%2046%20392%2C%20B1900%20La%20Plata%2C%20Provincia%20de%20Buenos%20Aires%2C%20Argentina!5e0!3m2!1sen!2sus!4v1678886400000!5m2!1sen!2sus";

  return (
    <section id="ubicacion" className="bg-neutral-beige relative overflow-hidden flex flex-col lg:flex-row min-h-[600px] border-y border-dark-deep/5">
      <div className="bg-grain"></div>
      
      {/* Information Block - Left/Top (40%) */}
      <div className="lg:w-[40%] p-12 md:p-20 flex flex-col justify-center relative">
        {/* Technical Watermark */}
        <div className="absolute top-10 left-10 text-[100px] font-serif italic text-dark-deep/[0.02] select-none pointer-events-none uppercase">
          Workshop
        </div>

        <div className="relative z-10 space-y-12">
          <div className="inline-flex items-center gap-3">
            <div className="w-8 h-px bg-primary-600"></div>
            <span className="text-[11px] font-black uppercase tracking-[0.5em] text-primary-600">Encuéntranos</span>
          </div>

          <div className="space-y-6">
            <h2 className="text-5xl md:text-6xl font-serif italic text-dark-deep tracking-tight leading-[0.9]">
              Donde la historia <br/> cobra vida
            </h2>
            <p className="text-base text-neutral-600 font-sans leading-relaxed max-w-sm">
              Visítanos en el corazón de La Plata. Un espacio dedicado a la restauración artesanal y el cuidado del calzado de alta gama.
            </p>
          </div>

          <div className="space-y-8 pt-8 border-t border-neutral-200">
            <div className="flex items-start gap-4">
              <div className="mt-1 text-primary-600">
                <MapPin size={24} />
              </div>
              <div>
                <span className="text-[10px] font-black uppercase tracking-widest text-neutral-400 block mb-1">Dirección Técnica</span>
                <p className="text-lg font-serif text-dark-deep italic leading-tight">
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
                className="inline-flex items-center gap-3 bg-dark-deep text-white px-8 py-4 rounded-sm font-sans font-bold text-[10px] uppercase tracking-[0.2em] hover:bg-primary-600 transition-all duration-500 shadow-xl active:scale-95 group"
              >
                <Navigation size={16} className="group-hover:rotate-12 transition-transform" />
                Obtener Ruta
              </a>
              <div className="w-14 h-14 border border-dark-deep/5 rounded-full flex items-center justify-center text-dark-deep opacity-30">
                <Compass size={20} className="animate-pulse" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Map Block - Right/Bottom (60%) */}
      <div className="lg:w-[60%] relative min-h-[400px] lg:min-h-0 border-l border-dark-deep/5">
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
        <div className="absolute bottom-10 right-10 bg-white/40 backdrop-blur-md p-4 border border-white/20 hidden md:block z-20 shadow-xl">
          <p className="text-[8px] font-sans font-bold uppercase tracking-[0.5em] text-dark-deep/60 whitespace-nowrap">
            LA PLATA // ARGENTINA
          </p>
        </div>
      </div>
    </section>
  );
};

export default LocationSection;
