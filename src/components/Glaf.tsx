'use client'

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
import 'chartjs-adapter-date-fns'; // ✅ 必須！← 時間軸を使うため

// Chart.js モジュール登録
ChartJS.register(
  TimeScale,        // ✅ CategoryScale ではなく TimeScale を使う
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Tooltip,
  Legend
);

// グラフデータ
const data = {
  datasets: [
    {
      label: '所持金',
        data:[
        { x: '2025-05-01', y: 19800 },
        { x: '2025-05-02', y: 20300 },
        { x: '2025-05-03', y: 18700 },
        { x: '2025-05-04', y: 21500 },
        { x: '2025-05-05', y: 22000 },
        { x: '2025-05-06', y: 19500 },
        { x: '2025-05-07', y: 20500 },
        { x: '2025-05-08', y: 21000 },
        { x: '2025-05-09', y: 19000 },
        { x: '2025-05-10', y: 23000 },
        { x: '2025-05-11', y: 22500 },
        { x: '2025-05-12', y: 24000 },
        { x: '2025-05-13', y: 23500 },
        { x: '2025-05-14', y: 25000 },
        { x: '2025-05-15', y: 24500 },
        { x: '2025-05-16', y: 26000 },
        { x: '2025-05-17', y: 27000 },
        { x: '2025-05-18', y: 26500 },
        { x: '2025-05-19', y: 25500 },
        { x: '2025-05-20', y: 24800 },
        { x: '2025-05-21', y: 23800 },
        { x: '2025-05-22', y: 23000 },
        { x: '2025-05-23', y: 22000 },
        { x: '2025-05-24', y: 20000 },
        { x: '2025-05-25', y: 19000 },
        { x: '2025-05-26', y: 18000 },
        { x: '2025-05-27', y: 17000 },
        { x: '2025-05-28', y: 16000 },
        { x: '2025-05-29', y: 17500 },
        { x: '2025-05-30', y: 18500 },
        { x: '2025-05-31', y: 19500 },
        ],
      borderColor: 'rgb(75, 192, 192)',
      backgroundColor: 'rgb(75, 192, 192)',
      tension: 0.4,
      pointRadius: 0.1,
    },
  ],
};

const options = {
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

const Glaf = () => {
  return <Line data={data} options={options} />;
};

export default Glaf;
