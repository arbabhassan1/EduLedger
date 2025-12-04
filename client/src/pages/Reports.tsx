import { motion } from 'framer-motion';
import { FileText } from 'lucide-react';

export default function Reports() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center justify-center min-h-[60vh] text-center"
    >
      <div className="bg-green-100 p-6 rounded-full mb-6">
        <FileText className="w-16 h-16 text-green-600" />
      </div>
      <h2 className="text-3xl font-bold text-gray-800 mb-4">Reports Page</h2>
      <p className="text-gray-600 max-w-md">
        This is a placeholder for the Reports page. You can add financial reports, analytics,
        and custom report generation features here.
      </p>
    </motion.div>
  );
}
