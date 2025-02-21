"use client"
import React, { useState } from 'react';
import { FaDownload } from "react-icons/fa";
import { BiDollar } from "react-icons/bi";
import { HiOutlineDocumentText } from "react-icons/hi";
import { IoCheckmarkCircleOutline } from "react-icons/io5";
import Select from 'react-select';
import { useGetAllTransactionQuery } from '@/redux/reducers/transactions/transactionThunk';

const FinancialTransactions = () => {
  const { data: transactionsData, isLoading } = useGetAllTransactionQuery();
  const [selectedStatus, setSelectedStatus] = useState({ value: 'all', label: 'All Transactions' });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!transactionsData) return null;

  const { overview, transactions } = transactionsData;
  const filteredTransactions = selectedStatus.value === 'all' 
    ? transactions 
    : transactions.filter(tx => tx.status === selectedStatus.value);

  const stats = [
    { 
      label: 'Total Amount', 
      value: `$${overview.totalAmount?.toFixed(2)}`,
      icon: <BiDollar size={24} />,
      gradient: 'from-blue-500/20 to-blue-600/20',
      textColor: 'text-blue-600'
    },
    { 
      label: 'Total Transactions', 
      value: overview.totalTransactions,
      icon: <HiOutlineDocumentText size={24} />,
      gradient: 'from-purple-500/20 to-purple-600/20',
      textColor: 'text-purple-600'
    },
    { 
      label: 'Completed', 
      value: overview.completedTransactions,
      icon: <IoCheckmarkCircleOutline size={24} />,
      gradient: 'from-green-500/20 to-green-600/20',
      textColor: 'text-green-600'
    }
  ];

  const statusOptions = [
    { value: 'all', label: 'All Transactions' },
    { value: 'completed', label: `Completed (${overview.completedTransactions})` },
    { value: 'pending', label: `Pending (${overview.pendingTransactions})` },
    { value: 'failed', label: `Failed (${overview.failedTransactions})` },
    { value: 'refunded', label: `Refunded (${overview.refundedTransactions})` }
  ];

  const selectStyles = {
    control: (base) => ({
      ...base,
      backgroundColor: '#EBF5FF',
      borderColor: 'transparent',
      boxShadow: 'none',
      '&:hover': {
        borderColor: 'transparent'
      },
      padding: '2px',
      minWidth: '200px'
    }),
    option: (base, { isFocused, isSelected }) => ({
      ...base,
      backgroundColor: isSelected ? '#2563EB' : isFocused ? '#BFDBFE' : 'white',
      color: isSelected ? 'white' : '#1F2937',
      '&:hover': {
        backgroundColor: isSelected ? '#2563EB' : '#BFDBFE'
      }
    })
  };

  return (
    <div className="bg-gradient-to-br from-white to-gray-50 rounded-xl p-6 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <div 
            key={index} 
            className="relative overflow-hidden bg-white p-6 rounded-xl shadow-sm group hover:-translate-y-1 transition-all duration-300"
          >
            <div className="relative z-10 flex items-center gap-4">
              <div className={`p-3 rounded-xl bg-gradient-to-br ${stat.gradient} ${stat.textColor}`}>
                {stat.icon}
              </div>
              <div>
                <div className={`text-2xl font-bold ${stat.textColor}`}>
                  {stat.value}
                </div>
                <div className="text-sm text-gray-500">{stat.label}</div>
              </div>
            </div>
            <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-gray-50/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-3">
            <Select
              value={selectedStatus}
              onChange={setSelectedStatus}
              options={statusOptions}
              styles={selectStyles}
              isSearchable={false}
            />
            <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
              {filteredTransactions.length} Transactions
            </span>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="py-4 px-6 text-left text-sm font-medium text-gray-500">ID</th>
                <th className="py-4 px-6 text-left text-sm font-medium text-gray-500">Amount</th>
                <th className="py-4 px-6 text-left text-sm font-medium text-gray-500">Date</th>
                <th className="py-4 px-6 text-left text-sm font-medium text-gray-500">Status</th>
                <th className="py-4 px-6 text-left text-sm font-medium text-gray-500">Details</th>
              </tr>
            </thead>
            <tbody>
              {filteredTransactions.map((tx) => (
                <tr key={tx._id} className="group hover:bg-gray-50 transition-colors">
                  <td className="py-4 px-6 text-sm font-medium text-gray-900">
                    {tx._id.slice(-8)}
                  </td>
                  <td className="py-4 px-6 text-sm font-semibold text-gray-900">
                    ${tx.totalAmount?.toLocaleString()}
                  </td>
                  <td className="py-4 px-6 text-sm text-gray-500">
                    {new Date(tx.createdAt).toLocaleDateString()}
                  </td>
                  <td className="py-4 px-6">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium
                      ${tx.status === 'completed' ? 'bg-green-100 text-green-700' : 
                        tx.status === 'pending' ? 'bg-yellow-100 text-yellow-700' : 
                        'bg-red-100 text-red-700'}`}>
                      {tx.status}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-sm text-gray-500">
                    {tx.transactionType === 'Job Payment' ? (
                      <span>{tx.job?.jobTitle}</span>
                    ) : tx.transactionType === 'Subscription Payment' ? (
                      <span className="px-3 py-1 rounded-lg text-white font-semibold" style={{ backgroundColor: tx.package?.packageColor }}>
                        {tx.package?.packageName}
                      </span>
                    ) : (
                      <span>{tx.transactionType}</span>
                    )}
                  </td>
               
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default FinancialTransactions;
