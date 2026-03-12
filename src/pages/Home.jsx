import Hero from '../components/features/home/Hero';
import ProductCarousel from '../components/features/products/ProductCarousel';
import LocationSection from '../components/features/location/LocationSection';

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
