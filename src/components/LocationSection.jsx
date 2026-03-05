import { MapPin, Navigation, ArrowRight } from 'lucide-react';

const LocationSection = () => {
  const address = "AGP, C. 46 392, B1900 La Plata, Provincia de Buenos Aires";
  const officialEmbedUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3271.74507025883!2d-57.95475148421071!3d-34.92215288220038!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bd8e08d6c7c00f%3A0x6b82b9e1e0a2d3b2!2sAGP%20C.%2046%20392%2C%20B1900%20La%20Plata%2C%20Provincia%20de%20Buenos%20Aires%2C%20Argentina!5e0!3m2!1sen!2sus!4v1678886400000!5m2!1sen!2sus";

  return (
    <section id="ubicacion" className="py-20 bg-neutral-beige">
      <div className="boutique-container">
        <div className="bg-white rounded-[3rem] overflow-hidden border border-neutral-200 shadow-xl flex flex-col lg:flex-row min-h-[500px]">
          
          {/* Info Side - Simplified */}
          <div className="lg:w-1/2 p-10 md:p-16 flex flex-col justify-center border-r border-neutral-100">
            <h3 className="text-3xl md:text-5xl font-black text-dark-deep leading-none uppercase tracking-tighter mb-12">
              LA PLATA
            </h3>

            <div className="space-y-12">
              <div className="flex items-start gap-6 group">
                <div className="w-12 h-12 bg-neutral-50 rounded-2xl flex items-center justify-center text-dark-deep group-hover:bg-primary-600 group-hover:text-white transition-all">
                  <MapPin size={20} />
                </div>
                <div>
                  <h4 className="text-sm font-black uppercase tracking-widest text-neutral-400 mb-1">Dirección</h4>
                  <p className="text-dark-deep font-bold text-lg leading-tight">
                    Calle 46 392, B1900 <br/>
                    La Plata, Buenos Aires
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-6 group">
                <div className="w-12 h-12 bg-neutral-50 rounded-2xl flex items-center justify-center text-dark-deep group-hover:bg-primary-600 group-hover:text-white transition-all">
                  <Navigation size={20} />
                </div>
                <div className="space-y-4">
                  <h4 className="text-sm font-black uppercase tracking-widest text-neutral-400 mb-1">Cómo Llegar</h4>
                  <p className="text-sm text-dark-deep font-bold max-w-xs">
                    Atención personalizada en recepción.
                  </p>
                  <a 
                    href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(address)}`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 text-primary-600 font-black text-[10px] uppercase tracking-[0.2em] group/link"
                  >
                    Trazar Ruta
                    <ArrowRight size={14} className="group-hover/link:translate-x-2 transition-transform" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Map Side - Professional Embed */}
          <div className="lg:w-1/2 relative min-h-[400px] bg-neutral-100 p-4">
            <div className="w-full h-full rounded-[2.5rem] overflow-hidden border-4 border-white shadow-inner relative">
              <iframe
                title="Punto Gilbert"
                width="100%"
                height="100%"
                frameBorder="0"
                scrolling="no"
                src={officialEmbedUrl}
                className="grayscale-[20%] hover:grayscale-0 transition-all duration-700"
                loading="lazy"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LocationSection;
