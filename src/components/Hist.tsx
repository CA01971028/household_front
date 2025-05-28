'use client';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";

const amounts: number[] = [
  5000, -2000, 10000, -3000, -500, 20000, -1000
]; // ⬅ プラスが収入、マイナスが支出

// 合計を計算
const income = amounts.filter(v => v > 0).reduce((sum, v) => sum + v, 0);
const expense = amounts.filter(v => v < 0).reduce((sum, v) => sum + Math.abs(v), 0);

// 棒グラフデータに変換
const totalData = [
  { name: 'Total', income, expense }
];

const Hist = () => {
  return (
    <div className="w-[45vw] h-[28svh] bg-white rounded-lg rounded-r-none">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={totalData}>
          <XAxis dataKey="name" tick={{ fontSize: 10 }} />
          <YAxis tick={{ fontSize: 8 }} />
          <Tooltip />
          <Legend wrapperStyle={{ fontSize: '10px' }} />
          <Bar dataKey="income" fill="#82ca9d" name="Income" barSize={30} />
          <Bar dataKey="expense" fill="#ff7979" name="Expense" barSize={30} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Hist;
