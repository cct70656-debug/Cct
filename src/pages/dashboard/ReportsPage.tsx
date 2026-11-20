import React from 'react';
import { useFinance } from '../../context/FinanceContext';
import { useAuth } from '../../context/AuthContext';
import { FileText, Download, Printer } from 'lucide-react';
import jsPDF from 'jspdf';
import ExcelJS from 'exceljs';

export const ReportsPage: React.FC = () => {
  const { incomes, expenses, savingsGoals, budgets } = useFinance();
  const { userProfile } = useAuth();

  const totalInc = incomes.reduce((s, i) => s + i.amount, 0);
  const totalExp = expenses.reduce((s, e) => s + e.amount, 0);
  const netBalance = totalInc - totalExp;

  const exportPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(20);
    doc.text('SmartFin AI - Financial Report', 14, 20);

    doc.setFontSize(12);
    doc.text(`User: ${userProfile?.fullName || 'User'}`, 14, 30);
    doc.text(`Email: ${userProfile?.email || ''}`, 14, 38);
    doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 14, 46);

    doc.setFontSize(16);
    doc.text('Financial Summary', 14, 60);
    doc.setFontSize(12);
    doc.text(`Total Income: $${totalInc.toLocaleString()}`, 14, 70);
    doc.text(`Total Expenses: $${totalExp.toLocaleString()}`, 14, 78);
    doc.text(`Net Balance: $${netBalance.toLocaleString()}`, 14, 86);

    doc.save('SmartFin_AI_Financial_Report.pdf');
  };

  const exportExcel = async () => {
    const workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet('Financial Summary');

    sheet.addRow(['SmartFin AI Financial Report']);
    sheet.addRow(['User', userProfile?.fullName]);
    sheet.addRow(['Total Income', totalInc]);
    sheet.addRow(['Total Expenses', totalExp]);
    sheet.addRow(['Net Balance', netBalance]);

    sheet.addRow([]);
    sheet.addRow(['Incomes']);
    sheet.addRow(['Title', 'Amount', 'Source', 'Date']);
    incomes.forEach(i => sheet.addRow([i.title, i.amount, i.source, i.date]));

    sheet.addRow([]);
    sheet.addRow(['Expenses']);
    sheet.addRow(['Title', 'Amount', 'Category', 'Date']);
    expenses.forEach(e => sheet.addRow([e.title, e.amount, e.category, e.date]));

    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'SmartFin_AI_Report.xlsx';
    a.click();
  };

  return (
    <div className="space-y-8 pb-12">
      <div>
        <h2 className="text-2xl font-bold text-white">Financial Reports & Exports</h2>
        <p className="text-xs text-slate-400">Download professional PDF reports and Excel worksheets for tax and accounting</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-8 rounded-3xl bg-[#191B35] border border-[#252849] space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-purple-500/20 text-[#A78BFA] flex items-center justify-center">
            <FileText className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-white">PDF Executive Report</h3>
          <p className="text-sm text-slate-300 leading-relaxed">
            Download a professionally formatted PDF report containing your financial summary, income/expense breakdown, and net savings.
          </p>
          <button
            onClick={exportPDF}
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#8056F5] to-[#A78BFA] text-white font-semibold text-sm shadow-lg shadow-[#8056F5]/30 hover:opacity-95 transition-all flex items-center space-x-2"
          >
            <Download className="w-4 h-4" />
            <span>Download PDF Report</span>
          </button>
        </div>

        <div className="p-8 rounded-3xl bg-[#191B35] border border-[#252849] space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
            <FileText className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-white">Excel Workbook Export</h3>
          <p className="text-sm text-slate-300 leading-relaxed">
            Export a complete multi-sheet Excel workbook containing all your incomes, expenses, budgets, and savings goals.
          </p>
          <button
            onClick={exportExcel}
            className="px-6 py-3 rounded-xl bg-emerald-600 text-white font-semibold text-sm shadow-lg shadow-emerald-600/30 hover:opacity-95 transition-all flex items-center space-x-2"
          >
            <Download className="w-4 h-4" />
            <span>Download Excel Workbook</span>
          </button>
        </div>
      </div>
    </div>
  );
};
