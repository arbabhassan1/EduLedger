import { motion } from 'framer-motion';
import { CreditCard } from 'lucide-react';

export default function Payments() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center justify-center min-h-[60vh] text-center"
    >
      <div className="bg-blue-100 p-6 rounded-full mb-6">
        <CreditCard className="w-16 h-16 text-blue-600" />
      </div>
      <h2 className="text-3xl font-bold text-gray-800 mb-4">Payments Page</h2>
      <p className="text-gray-600 max-w-md">
        This is a placeholder for the Payments page. You can add payment processing features,
        payment history, and payment methods here.
      </p>
    </motion.div>
  );
}
