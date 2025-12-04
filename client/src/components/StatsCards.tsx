import { motion } from 'framer-motion';
import {
  Users,
  DollarSign,
  TrendingUp,
  Clock,
  CheckCircle,
  AlertCircle,
} from 'lucide-react';

interface StatsData {
  totalStudents: number;
  totalFundRequired: number;
  totalCollected: number;
  totalRemaining: number;
  paidStudents: number;
  pendingStudents: number;
}

interface StatsCardsProps {
  data: StatsData;
}

export default function StatsCards({ data }: StatsCardsProps) {
  const cards = [
    {
      title: 'Total Students',
      value: data.totalStudents.toLocaleString(),
      icon: Users,
      bgColor: 'bg-blue-500',
      lightBg: 'bg-blue-50',
      borderColor: 'border-blue-200',
    },
    {
      title: 'Total Fund Required',
      value: `₹${data.totalFundRequired.toLocaleString()}`,
      icon: DollarSign,
      bgColor: 'bg-purple-500',
      lightBg: 'bg-purple-50',
      borderColor: 'border-purple-200',
    },
    {
      title: 'Total Collected',
      value: `₹${data.totalCollected.toLocaleString()}`,
      icon: TrendingUp,
      bgColor: 'bg-green-500',
      lightBg: 'bg-green-50',
      borderColor: 'border-green-200',
    },
    {
      title: 'Total Remaining',
      value: `₹${data.totalRemaining.toLocaleString()}`,
      icon: Clock,
      bgColor: 'bg-orange-500',
      lightBg: 'bg-orange-50',
      borderColor: 'border-orange-200',
    },
    {
      title: 'Paid Students',
      value: data.paidStudents.toLocaleString(),
      icon: CheckCircle,
      bgColor: 'bg-teal-500',
      lightBg: 'bg-teal-50',
      borderColor: 'border-teal-200',
    },
    {
      title: 'Pending Students',
      value: data.pendingStudents.toLocaleString(),
      icon: AlertCircle,
      bgColor: 'bg-red-500',
      lightBg: 'bg-red-50',
      borderColor: 'border-red-200',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: 'easeOut',
      },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6"
    >
      {cards.map((card, index) => {
        const Icon = card.icon;
        return (
          <motion.div
            key={index}
            variants={itemVariants}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
            className={`${card.lightBg} ${card.borderColor} border rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow`}
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium mb-2">{card.title}</p>
                <h3 className="text-2xl lg:text-3xl font-bold text-gray-800">
                  {card.value}
                </h3>
              </div>
              <div className={`${card.bgColor} p-3 rounded-lg`}>
                <Icon className="w-6 h-6 text-white" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-xs text-gray-500">
              <div className="w-full bg-gray-200 h-1 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: '70%' }}
                  transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                  className={`h-full ${card.bgColor}`}
                />
              </div>
            </div>
          </motion.div>
        );
      })}
    </motion.div>
  );
}
