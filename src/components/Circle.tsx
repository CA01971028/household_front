'use client';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

type CategoryExpense = {
  category: string;
  amount: number;
};

const expenseData: CategoryExpense[] = [
  { category: '食費', amount: 15000 },
  { category: '交通費', amount: 5000 },
  { category: '娯楽', amount: 3000 },
  { category: '光熱費', amount: 7000 },
  { category: '通信費光熱費', amount: 4000 },
];

const COLORS = ['#FF6B6B', '#FFD93D', '#6BCB77', '#4D96FF', '#FF9F1C'];

const renderCustomLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index
}: any) => {
  const RADIAN = Math.PI / 180;
  // ラベル位置をさらに外にずらす（今の1.1 → 1.3に）
  const radius = innerRadius + (outerRadius - innerRadius) * 1.3; 
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="black"
      textAnchor="middle"
      dominantBaseline="central"
      fontSize={10}
    >
      {expenseData[index].category}
    </text>
  );
};

const Circle = () => {
  return (
          <div className="w-[55vw] h-[28svh] bg-white rounded-lg rounded-l-none overflow-visible">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={expenseData}
                  dataKey="amount"
                  nameKey="category"
                  cx="50%" // ←中央に戻す
                  cy="50%"
                  outerRadius={50}
                  labelLine={false}
                  label={renderCustomLabel}
                >
                  {expenseData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
  );
};

export default Circle;
