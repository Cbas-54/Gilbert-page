import { MapPin, Navigation, Compass } from 'lucide-react';

const LocationSection = () => {
  const address = "C. 49 894, B1902CKF La Plata, Provincia de Buenos Aires";
  const officialEmbedUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3271.46731000715!2d-57.956228499999995!3d-34.91981529999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95a2e6321e88afc5%3A0x1b340291caff8402!2sC.%2049%20894%2C%20B1902CKF%20La%20Plata%2C%20Provincia%20de%20Buenos%20Aires!5e0!3m2!1ses-419!2sar!4v1776571325945!5m2!1ses-419!2sar";

  return (
    <section id="ubicacion" className="bg-card relative overflow-hidden flex flex-col lg:flex-row min-h-[600px] border-y border-border">
      <div className="bg-grain"></div>
      
      {/* Information Block - Left/Top (40%) */}
      <div className="lg:w-[40%] p-12 md:p-20 flex flex-col justify-center relative">
        {/* Technical Watermark */}
        <div className="absolute top-10 left-10 text-[80px] font-serif italic text-foreground/[0.03] select-none pointer-events-none uppercase tracking-tighter">
          Taller
        </div>

        <div className="relative z-10 space-y-12">
          <div className="inline-flex items-center gap-3">
            <div className="w-8 h-px bg-primary-600"></div>
            <span className="text-[11px] font-black uppercase tracking-[0.5em] text-primary-600">Encuéntranos</span>
          </div>

          <div className="space-y-6">
            <h2 className="text-5xl md:text-6xl font-serif italic text-foreground tracking-tight leading-[0.9]">
              Donde la historia <br/> cobra vida
            </h2>
            <p className="text-base text-muted-foreground font-sans leading-relaxed max-w-sm">
              Visítanos en el corazón de La Plata. Un espacio dedicado a la restauración artesanal y el cuidado del calzado de alta gama.
            </p>
          </div>

          <div className="space-y-8 pt-8 border-t border-border">
            <div className="flex items-start gap-4">
              <div className="mt-1 text-primary-600">
                <MapPin size={24} />
              </div>
              <div>
                <p className="text-lg font-serif text-foreground italic leading-tight">
                  Calle 49 894 (e/ 12 y 13) <br/>
                  La Plata, Buenos Aires.
                </p>
              </div>
            </div>

            <div className="flex gap-4 pt-4">
              <a 
                href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(address)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-foreground text-background px-8 py-4 rounded-sm font-sans font-bold text-[10px] uppercase tracking-[0.2em] hover:bg-primary-600 transition-all duration-500 shadow-xl active:scale-95 group"
              >
                <Navigation size={16} className="group-hover:rotate-12 transition-transform" />
                Obtener Ruta
              </a>
              <div className="w-14 h-14 border border-border rounded-full flex items-center justify-center text-foreground opacity-40">
                <Compass size={20} className="animate-pulse" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Map Block - Right/Bottom (60%) */}
      <div className="lg:w-[60%] relative min-h-[400px] lg:min-h-0 border-l border-border">
        <div className="absolute inset-0 bg-muted">
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
        
      </div>
    </section>
  );
};

export default LocationSection;
