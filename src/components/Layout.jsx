import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen bg-dark-900 text-neutral-50 overflow-x-hidden">
      <Navbar />
      <main className="flex-grow flex flex-col items-center w-full">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
