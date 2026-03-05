import Hero from '../components/Hero';
import ProductCarousel from '../components/ProductCarousel';

const Home = () => {
  return (
    <div className="w-full">
      <Hero />
      <ProductCarousel />
      
      {/* Decorative separator or additional section can go here */}
      <section className="py-20 bg-neutral-100 border-t border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-black text-dark-950 mb-8 uppercase tracking-widest text-sm">Empresas e Instituciones que Confían en Nosotros</h2>
          <div className="flex flex-wrap justify-center gap-8 md:gap-20 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
            {/* Placeholder trust badges */}
            <div className="flex items-center space-x-3 text-xl font-black text-neutral-500 hover:text-dark-950 transition-colors">
              <span className="w-10 h-10 rounded-full bg-white border border-neutral-300 shadow-sm flex items-center justify-center text-primary-600">1</span>
              <span>Deportivo Local</span>
            </div>
            <div className="flex items-center space-x-3 text-xl font-black text-neutral-500 hover:text-dark-950 transition-colors">
              <span className="w-10 h-10 rounded-full bg-white border border-neutral-300 shadow-sm flex items-center justify-center text-primary-600">2</span>
              <span>Club Atlético</span>
            </div>
            <div className="flex items-center space-x-3 text-xl font-black text-neutral-500 hover:text-dark-950 transition-colors">
              <span className="w-10 h-10 rounded-full bg-white border border-neutral-300 shadow-sm flex items-center justify-center text-primary-600">3</span>
              <span>Marroquinería Premium</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
