import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { Transaction } from '../types';

export const exportToCSV = (transactions: Transaction[], filename = 'transactions.csv') => {
  const headers = ['Student Name', 'Roll No', 'Class', 'Amount Paid', 'Remaining', 'Payment Date'];

  const csvContent = [
    headers.join(','),
    ...transactions.map((t) =>
      [
        `"${t.studentName}"`,
        t.rollNo,
        t.class,
        t.amountPaid,
        t.remaining,
        new Date(t.paymentDate).toLocaleDateString('en-IN'),
      ].join(',')
    ),
  ].join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);

  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  link.style.visibility = 'hidden';

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const exportToPDF = (transactions: Transaction[], filename = 'transactions.pdf') => {
  const doc = new jsPDF();

  doc.setFontSize(18);
  doc.text('Transaction Report', 14, 22);

  doc.setFontSize(11);
  doc.setTextColor(100);
  doc.text(`Generated on: ${new Date().toLocaleDateString('en-IN')}`, 14, 30);

  const tableData = transactions.map((t) => [
    t.studentName,
    t.rollNo,
    t.class,
    `₹${t.amountPaid.toLocaleString()}`,
    `₹${t.remaining.toLocaleString()}`,
    new Date(t.paymentDate).toLocaleDateString('en-IN'),
  ]);

  autoTable(doc, {
    startY: 35,
    head: [['Student Name', 'Roll No', 'Class', 'Amount Paid', 'Remaining', 'Payment Date']],
    body: tableData,
    theme: 'striped',
    headStyles: {
      fillColor: [59, 130, 246],
      textColor: 255,
      fontSize: 10,
      fontStyle: 'bold',
    },
    bodyStyles: {
      fontSize: 9,
    },
    alternateRowStyles: {
      fillColor: [245, 247, 250],
    },
  });

  const totalPaid = transactions.reduce((sum, t) => sum + t.amountPaid, 0);
  const totalRemaining = transactions.reduce((sum, t) => sum + t.remaining, 0);

  const finalY = (doc as any).lastAutoTable.finalY || 35;

  doc.setFontSize(12);
  doc.setTextColor(0);
  doc.text(`Total Collected: ₹${totalPaid.toLocaleString()}`, 14, finalY + 10);
  doc.text(`Total Remaining: ₹${totalRemaining.toLocaleString()}`, 14, finalY + 18);

  doc.save(filename);
};
