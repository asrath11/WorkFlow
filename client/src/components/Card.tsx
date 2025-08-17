import { TrendingUp, TrendingDown, type LucideIcon } from 'lucide-react';

function Card({
  title,
  value,
  Icon,
  trend = 0, // percentage change
}: {
  title: string;
  value: number;
  Icon: LucideIcon;
  trend?: number;
}) {
  const isPositive = trend >= 0;

  return (
    <div className='flex items-center justify-between gap-4 bg-card p-4 rounded-2xl sm:w-full lg:max-w-sm shadow-sm'>
      <div>
        <h1 className='flex items-center gap-2 text-xl text-muted-foreground'>
          {title}
        </h1>
        <p className='text-4xl font-bold text-primary'>{value}</p>
        <p
          className={`text-sm flex items-center gap-2 ${
            isPositive ? 'text-green-400' : 'text-red-400'
          }`}
        >
          {isPositive ? <TrendingUp size={20} /> : <TrendingDown size={20} />}
          <span>{Math.abs(trend)}% from last month</span>
        </p>
      </div>
      <div>
        <Icon size={48} className='text-muted-foreground' />
      </div>
    </div>
  );
}

export default Card;
