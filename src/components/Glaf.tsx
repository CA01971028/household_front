'use client'

import { useEffect, useState } from 'react';
import {
  Chart as ChartJS,
  TimeScale,         // 追加: 時間軸に必要
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import 'chartjs-adapter-date-fns'; 
import type { ChartOptions } from 'chart.js';
import Image from 'next/image';
import notfound from "../../public/notfound2.png"; // 画像パス

import { isArrayEmpty } from '../app/utils/arrayUtils';

ChartJS.register(
  TimeScale,        
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Tooltip,
  Legend
);

type homeResult = {
  date: string;
  label: string;
  amount: number;
  memo: string;
};

// `Glaf` コンポーネントが扱えるデータ型に合わせる
type GlafData = {
  x: string; // 日付
  y: number; // 金額
};

type Props = {
  data: homeResult[];  // プロップスとしてhomeResult[]を受け取る
};

const Glaf = ({ data }: Props) => {
  const [chartData, setChartData] = useState<any>(null);

  // データが更新されたら、グラフ用データに変換
  useEffect(() => {
    if (!isArrayEmpty(data)) {
      const transformedData: GlafData[] = data.map(item => ({
        x: item.date,  // 日付
        y: item.amount,  // 金額
      }));

      setChartData({
        datasets: [
          {
            label: '所持金',
            data: transformedData,
            borderColor: 'rgb(75, 192, 192)',
            backgroundColor: 'rgb(75, 192, 192)',
            tension: 0.4,
            pointRadius: 0.1,
          },
        ],
      });
    }
  }, [data]);

  const options: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: '日別所持金推移',
      },
    },
    scales: {
      x: {
        type: 'time' as const,
        time: {
          unit: 'day',
          tooltipFormat: 'yyyy年MM月dd日',
          displayFormats: {
            day: 'MM/dd',
          },
        },
        title: {
          display: true,
          text: '日付',
        },
      },
    },
  };

  return (
    <div className="relative w-full h-full">
      {isArrayEmpty(data) ? (
        <Image
          src={notfound}
          alt="データがありません"
          className="mx-[20%]"
          width={210}
          height={210}
        />
      ) : (
        chartData && <Line data={chartData} options={options} />
      )}
    </div>
  );
};

export default Glaf;
