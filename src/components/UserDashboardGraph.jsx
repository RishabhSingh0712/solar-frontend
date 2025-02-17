import React from 'react';
import { Line, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const PowerVsRadiationGraph = () => {
  const data = {
    labels: ['7:45', '8:15', '8:45', '9:15', '9:45', '10:15'],
    datasets: [
      {
        label: 'Power (kW)',
        data: [0, 0.4, 0.8, 1.2, 1.4, 1.1 ],
        backgroundColor: 'rgba(75,192,192,0.5)',
        borderColor: 'rgba(75,192,192,1)',
        fill: true,
      },
      {
        label: 'Irradiation (kW/m²)',
        data: [0, 0.15, 0.3, 0.6, 0.6, 0.3],
        backgroundColor: 'rgba(153,102,255,0.5)',
        borderColor: 'rgba(153,102,255,1)',
        fill: true,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false, // This allows the graph to resize properly
    plugins: {
      legend: {
        position: 'top',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div style={{ display: 'flex', width: '100%', minHeight: '250px', maxHeight: '400px', position: 'relative' }}>
      <Line data={data} options={options} />
    </div>
  );
};

const DashboardGraphs = () => {
  return (
    <div style={{ display: 'flex', gap: '2rem', marginTop: '2rem' }}>
      <div style={{ width: '100%'}}>
        <PowerVsRadiationGraph />
      </div>
    </div>
  );
};

const UserDashboardGraphs = () => {
  return (
    <div className="w-full bg-white  flex flex-col px-4 py-2 ">
      {/* Other components and layout here */}
      <h2 className="text-lg font-semibold mb-4">Power vs Irradiation</h2>
      <DashboardGraphs />
      {/* Other components can follow */}
    </div>
  );
};

export default UserDashboardGraphs;
