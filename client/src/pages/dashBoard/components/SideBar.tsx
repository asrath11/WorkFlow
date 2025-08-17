import { cn } from '@/lib/utils';
import { LogOut } from 'lucide-react';

interface SideBarProps {
  menuItems: { title: string; icon: React.ReactNode; path: string }[];
  activePath: string;
  onSelect: (path: string) => void;
  onLogout?: () => void;
}

export default function SideBar({
  menuItems,
  activePath,
  onSelect,
  onLogout,
}: SideBarProps) {
  return (
    <div className='w-60 bg-primary text-primary-foreground flex flex-col h-full justify-between'>
      <div>
        <h2 className='text-xl font-bold p-4'>WorkFlow</h2>
        <div className='mt-4'>
          {menuItems.map((item) => (
            <button
              key={item.title}
              onClick={() => onSelect(item.path)}
              className={cn(
                'flex items-center gap-2 px-4 py-3 w-full text-left hover:bg-white/10 transition-colors',
                activePath === item.path &&
                  'bg-white/20 border-l-4 border-card font-semibold'
              )}
            >
              <span className='w-5 flex justify-center'>{item.icon}</span>
              <span>{item.title}</span>
            </button>
          ))}
        </div>
      </div>

      {onLogout && (
        <button
          onClick={onLogout}
          className='flex items-center gap-2 px-4 py-3 w-full text-left hover:bg-white/10 transition-colors border-t border-white/20 mt-auto'
        >
          <span className='w-5 flex justify-center'>
            <LogOut size={20} />
          </span>
          <span>Logout</span>
        </button>
      )}
    </div>
  );
}
