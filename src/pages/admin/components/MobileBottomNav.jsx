import { LayoutGrid, ShoppingBag, EyeOff } from 'lucide-react';

const MobileBottomNav = ({ 
  statusFilter, 
  setStatusFilter, 
  stats 
}) => {
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-background/80 backdrop-blur-xl border-t border-border z-50 px-6 py-3">
      <div className="flex items-center justify-around max-w-md mx-auto">
        {[
          { id: 'Todos', label: 'Todos', icon: LayoutGrid, count: stats.total },
          { id: 'Activo', label: 'Venta', icon: ShoppingBag, count: stats.active },
          { id: 'Suspendido', label: 'Pausa', icon: EyeOff, count: stats.suspended }
        ].map(item => (
          <button
            key={item.id}
            onClick={() => setStatusFilter(item.id)}
            className="flex flex-col items-center gap-1 relative group"
          >
            <div className={`px-5 py-1 rounded-full transition-all duration-300 ${statusFilter === item.id ? 'bg-primary/20' : 'group-hover:bg-muted'}`}>
              <item.icon size={20} className={statusFilter === item.id ? 'text-primary-600' : 'text-muted-foreground'} />
            </div>
            <span className={`text-[10px] font-black uppercase tracking-tighter ${statusFilter === item.id ? 'text-foreground' : 'text-muted-foreground/60'}`}>
              {item.label}
            </span>
            {item.count > 0 && (
              <span className="absolute -top-1 -right-1 bg-primary text-background text-[8px] font-bold px-1 rounded-full min-w-[14px] text-center border-2 border-background">
                {item.count}
              </span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default MobileBottomNav;
