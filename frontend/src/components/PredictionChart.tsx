import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { motion } from 'framer-motion';
import { fadeIn } from '../animations/motionVariants';

ChartJS.register(ArcElement, Tooltip, Legend);

interface PredictionChartProps {
  percentage: number;
}

export default function PredictionChart({ percentage }: PredictionChartProps) {
  const data = {
    labels: ['Ready', 'Growth Area'],
    datasets: [
      {
        data: [percentage, 100 - percentage],
        backgroundColor: ['#12BDFF', '#F9F9F9'],
        borderWidth: 0,
      },
    ],
  };

  const options = {
    cutout: '75%',
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: false,
      },
    },
  };

  return (
    <motion.div
      variants={fadeIn}
      initial="hidden"
      animate="visible"
      className="relative"
    >
      <div className="w-64 h-64 mx-auto">
        <Doughnut data={data} options={options} />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="text-5xl font-bold text-text-primary">{percentage}%</div>
            <div className="text-sm text-text-secondary mt-1">Ready</div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
