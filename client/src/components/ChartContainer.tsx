import {
  BarChart,
  Bar,
  ResponsiveContainer,
  XAxis,
  Tooltip,
  Cell,
} from 'recharts';

const data = [
  { name: 'Jan', employee: 20 },
  { name: 'Feb', employee: 15 },
  { name: 'Mar', employee: 18 },
  { name: 'Apr', employee: 25 },
  { name: 'May', employee: 12 },
  { name: 'Jun', employee: 22 },
  { name: 'Jul', employee: 19 },
  { name: 'Aug', employee: 17 },
  { name: 'Sep', employee: 21 },
  { name: 'Oct', employee: 23 },
  { name: 'Nov', employee: 16 },
  { name: 'Dec', employee: 24 },
];

const ChartContainer = ({ month }: { month: number }) => {
  return (
    <ResponsiveContainer width='100%' height={350}>
      <BarChart data={data}>
        <XAxis dataKey='name' axisLine={false} tickLine={false} />
        <Tooltip />
        <Bar dataKey='employee' barSize={40} radius={[10, 10, 10, 10]}>
          {data.map((_, index) => (
            <Cell
              key={`cell-${index}`}
              fill={index === month ? '#557bff' : '#e5dbff'} // highlight active
            />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};

export default ChartContainer;
