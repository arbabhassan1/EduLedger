import { useState } from 'react';
import StatsCards from '../components/StatsCards';
import PaymentTrendsChart from '../components/PaymentTrendsChart';
import ClassWiseChart from '../components/ClassWiseChart';
import TransactionsTable from '../components/TransactionsTable';
import { exportToCSV, exportToPDF } from '../utils/exportUtils';
import {
  statsData,
  mockTransactions,
  monthlyPaymentData,
  dailyPaymentData,
  classWiseData,
} from '../data/mockData';

export default function Dashboard() {
  const [viewType, setViewType] = useState<'daily' | 'monthly'>('monthly');

  const handleExportCSV = () => {
    exportToCSV(mockTransactions);
  };

  const handleExportPDF = () => {
    exportToPDF(mockTransactions);
  };

  return (
    <div className="space-y-6">
      <StatsCards data={statsData} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <PaymentTrendsChart
          data={viewType === 'daily' ? dailyPaymentData : monthlyPaymentData}
          viewType={viewType}
          onViewTypeChange={setViewType}
        />
        <ClassWiseChart data={classWiseData} />
      </div>

      <TransactionsTable
        transactions={mockTransactions}
        onExportCSV={handleExportCSV}
        onExportPDF={handleExportPDF}
      />
    </div>
  );
}
