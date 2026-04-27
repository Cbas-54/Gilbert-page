import { LayoutGrid, ShoppingBag, EyeOff } from 'lucide-react';

const MobileBottomNav = ({ 
  statusFilter, 
  setStatusFilter, 
  stats 
}) => {
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-zinc-900 border-t border-white dark:border-white/5 z-50 px-6 py-3 shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
      <div className="flex items-center justify-around max-w-md mx-auto">
        {[
          { id: 'Todos', label: 'Todos', icon: LayoutGrid, count: stats.total },
          { id: 'Activo', label: 'Activos', icon: ShoppingBag, count: stats.active },
          { id: 'Suspendido', label: 'Pausados', icon: EyeOff, count: stats.suspended }
        ].map(item => (
          <button
            key={item.id}
            onClick={() => setStatusFilter(item.id)}
            className="flex flex-col items-center gap-1 relative group cursor-pointer"
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
