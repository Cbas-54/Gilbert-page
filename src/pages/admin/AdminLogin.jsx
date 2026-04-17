import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { KeyRound, Lock, ArrowRight, AlertCircle } from 'lucide-react';

const AdminLogin = () => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simplified security: The real validation happens on the Apps Script side later,
    // but we use this to gate the dashboard locally.
    if (password === 'gilberth2026') {
      localStorage.setItem('admin_token', password);
      navigate('/admin');
    } else {
      setError(true);
      setTimeout(() => setError(false), 2000);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-dark-rich px-6 relative overflow-hidden">
      
      {/* Decorative Background Accents */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
        <div className="absolute top-[10%] left-[5%] w-64 h-64 bg-primary-600 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[10%] right-[5%] w-96 h-96 bg-primary-800 rounded-full blur-[150px]"></div>
      </div>

      <div className="w-full max-w-sm relative z-10 space-y-12">
        <div className="text-center space-y-4">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-card border border-border/50 text-primary-600 mb-4 shadow-xl">
            <Lock size={32} />
          </div>
          <h1 className="font-serif text-4xl italic text-white">Gilbert Admin</h1>
          <p className="font-sans text-[10px] font-black uppercase tracking-[0.4em] text-white/40">Acceso Restringido</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative group">
            <KeyRound className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20 group-focus-within:text-primary-600 transition-colors" />
            <input 
              type="password"
              placeholder="Contraseña Maestra"
              autoFocus
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`w-full bg-card/50 backdrop-blur-md border px-14 py-6 rounded-sm font-sans text-sm text-white focus:outline-none transition-all duration-500
                ${error ? 'border-red-500/50 shadow-[0_0_20px_rgba(239,68,68,0.2)]' : 'border-border/50 focus:border-primary/50'}
              `}
            />
          </div>

          <button 
            type="submit"
            className="w-full group flex items-center justify-center gap-4 bg-white text-black py-6 rounded-sm font-sans text-[10px] font-black uppercase tracking-widest hover:bg-primary hover:text-white transition-all duration-500"
          >
            Entrar al Sistema
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </form>

        {error && (
          <div className="flex items-center justify-center gap-3 text-red-500 animate-in fade-in slide-in-from-top-2">
            <AlertCircle size={14} />
            <span className="text-[10px] font-black uppercase tracking-widest">Contraseña Incorrecta</span>
          </div>
        )}

        <div className="text-center pt-8">
           <button 
            onClick={() => navigate('/')}
            className="font-sans text-[9px] font-bold uppercase tracking-widest text-white/30 hover:text-white/60 transition-colors"
           >
             ← Volver a la Web Pública
           </button>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
