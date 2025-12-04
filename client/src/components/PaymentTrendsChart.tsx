import { motion } from 'framer-motion';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { ChartData } from '../types';

interface PaymentTrendsChartProps {
  data: ChartData[];
  viewType: 'daily' | 'monthly';
  onViewTypeChange: (type: 'daily' | 'monthly') => void;
}

export default function PaymentTrendsChart({
  data,
  viewType,
  onViewTypeChange,
}: PaymentTrendsChartProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
    >
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h3 className="text-lg font-semibold text-gray-800">Payment Trends</h3>
        <div className="flex gap-2">
          <button
            onClick={() => onViewTypeChange('daily')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              viewType === 'daily'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            Daily
          </button>
          <button
            onClick={() => onViewTypeChange('monthly')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              viewType === 'monthly'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            Monthly
          </button>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis
            dataKey="name"
            stroke="#6b7280"
            style={{ fontSize: '12px' }}
          />
          <YAxis
            stroke="#6b7280"
            style={{ fontSize: '12px' }}
            tickFormatter={(value) => `₹${value / 1000}k`}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: '#fff',
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
            }}
            formatter={(value: number) => [`₹${value.toLocaleString()}`, 'Amount']}
          />
          <Legend />
          <Line
            type="monotone"
            dataKey="collected"
            stroke="#10b981"
            strokeWidth={3}
            dot={{ fill: '#10b981', r: 4 }}
            activeDot={{ r: 6 }}
            name="Collected"
          />
          <Line
            type="monotone"
            dataKey="pending"
            stroke="#f59e0b"
            strokeWidth={3}
            dot={{ fill: '#f59e0b', r: 4 }}
            activeDot={{ r: 6 }}
            name="Pending"
          />
        </LineChart>
      </ResponsiveContainer>
    </motion.div>
  );
}
