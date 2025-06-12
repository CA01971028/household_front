'use client';

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import React from 'react';

// カテゴリーと金額の型
type CategoryExpense = {
  category: string;
  amount: number;
};

// propsの型
type CircleProps = {
  expenseData: CategoryExpense[];
  width:string;
  height:string;
  budget:boolean;
};

// 色配列
const COLORS = ['#FF6B6B', '#FFD93D', '#6BCB77', '#4D96FF', '#FF9F1C'];

// カスタムラベル描画関数
const renderCustomLabel = (
  props: any
) => {
  const {
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    index,
    payload
  } = props;

  const RADIAN = Math.PI / 180;
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
      {payload.category}
    </text>
  );
};

// メインコンポーネント
const Circle = ({ expenseData, width, height, budget }: CircleProps) => {
  return (
    <div className={`${width} ${height} bg-white rounded-lg rounded-l-none overflow-visible flex items-center`}>
      {/* グラフエリア（左） */}
      <div className={`${budget ?("w-1/2"):("w-full")} h-full`}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={expenseData}
              dataKey="amount"
              nameKey="category"
              cx="50%"
              cy="50%"
              outerRadius={50}
              labelLine={false}
              label={budget ? false : renderCustomLabel}
            >
              {expenseData.map((_, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* カテゴリ一覧（右） */}
      {budget &&(
        <ul className="w-1/2 flex flex-col justify-center text-sm pl-2">
        {expenseData.map((item, index) => (
          <li key={index} className="flex items-center space-x-2 mb-1">
            <span
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: COLORS[index % COLORS.length] }}
            ></span>
            <span>{item.category}</span>
          </li>
        ))}
      </ul>
      )}
      
    </div>
  );
};


export default Circle;
