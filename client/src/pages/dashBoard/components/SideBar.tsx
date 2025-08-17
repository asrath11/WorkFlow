import { cn } from '@/lib/utils';

interface SideBarProps {
  menuItems: { title: string; icon: React.ReactNode; path: string }[];
  activePath: string;
  onSelect: (path: string) => void;
}

export default function SideBar({
  menuItems,
  activePath,
  onSelect,
}: SideBarProps) {
  return (
    <div className='w-60 bg-primary text-primary-foreground flex flex-col'>
      <h2 className='text-xl font-bold p-4'>WorkFlow</h2>
      {menuItems.map((item) => (
        <button
          key={item.title}
          onClick={() => onSelect(item.path)}
          className={cn(
            'flex items-center gap-2 px-4 py-3 text-left',
            activePath === item.path &&
              'bg-white/20 border-l-4 border-card font-semibold'
          )}
        >
          {item.icon}
          {item.title}
        </button>
      ))}
    </div>
  );
}
