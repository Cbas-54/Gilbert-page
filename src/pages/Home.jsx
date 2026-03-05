import Hero from '../components/Hero';
import ProductCarousel from '../components/ProductCarousel';
import LocationSection from '../components/LocationSection';

const Home = () => {
  return (
    <div className="w-full">
      <Hero />
      <ProductCarousel />
      <LocationSection />
    </div>
  );
};

export default Home;
