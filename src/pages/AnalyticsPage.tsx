import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  BarChart as BarChartIcon, 
  LineChart as LineChartIcon, 
  PieChart as PieChartIcon, 
  Calendar, 
  Users, 
  Clock, 
  CheckCircle, 
  XCircle 
} from 'lucide-react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line, Bar, Pie } from 'react-chartjs-2';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const AnalyticsPage: React.FC = () => {
  const [dateRange, setDateRange] = useState('week');
  
  // Mock data for charts
  const accuracyData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Accuracy',
        data: [92, 94, 89, 96, 93, 95, 97],
        borderColor: 'rgb(99, 102, 241)',
        backgroundColor: 'rgba(99, 102, 241, 0.5)',
        tension: 0.3,
      },
    ],
  };
  
  const recognitionsData = {
    labels: ['John Doe', 'Jane Smith', 'Mike Johnson', 'Sarah Williams', 'David Brown'],
    datasets: [
      {
        label: 'Recognitions',
        data: [42, 38, 27, 23, 19],
        backgroundColor: [
          'rgba(99, 102, 241, 0.8)',
          'rgba(79, 70, 229, 0.8)',
          'rgba(67, 56, 202, 0.8)',
          'rgba(55, 48, 163, 0.8)',
          'rgba(49, 46, 129, 0.8)',
        ],
        borderWidth: 1,
      },
    ],
  };
  
  const statusData = {
    labels: ['Recognized', 'Unknown', 'Low Confidence'],
    datasets: [
      {
        label: 'Status',
        data: [65, 20, 15],
        backgroundColor: [
          'rgba(74, 222, 128, 0.8)',
          'rgba(248, 113, 113, 0.8)',
          'rgba(251, 191, 36, 0.8)',
        ],
        borderWidth: 1,
      },
    ],
  };
  
  // Mock data for activity logs
  const activityLogs = [
    { id: 1, name: 'John Doe', status: 'recognized', confidence: 0.94, timestamp: '2023-06-15 09:32:45' },
    { id: 2, name: 'Unknown', status: 'unknown', confidence: 0.45, timestamp: '2023-06-15 10:15:22' },
    { id: 3, name: 'Jane Smith', status: 'recognized', confidence: 0.88, timestamp: '2023-06-15 11:03:17' },
    { id: 4, name: 'Mike Johnson', status: 'recognized', confidence: 0.92, timestamp: '2023-06-15 13:45:09' },
    { id: 5, name: 'Sarah Williams', status: 'low_confidence', confidence: 0.68, timestamp: '2023-06-15 14:22:31' },
    { id: 6, name: 'David Brown', status: 'recognized', confidence: 0.91, timestamp: '2023-06-15 15:17:42' },
    { id: 7, name: 'Unknown', status: 'unknown', confidence: 0.32, timestamp: '2023-06-15 16:05:11' },
  ];
  
  // Chart options
  const lineOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Recognition Accuracy Over Time',
      },
    },
    scales: {
      y: {
        min: 80,
        max: 100,
      },
    },
  };
  
  const barOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Most Recognized Faces',
      },
    },
  };
  
  const pieOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'right' as const,
      },
      title: {
        display: true,
        text: 'Recognition Status Distribution',
      },
    },
  };
  
  const handleDateRangeChange = (range: string) => {
    setDateRange(range);
    // In a real app, this would fetch new data based on the selected range
  };
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Analytics Dashboard
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Track performance metrics and recognition statistics
            </p>
          </motion.div>
        </div>

        {/* Date Range Filter */}
        <div className="mb-8 flex justify-end">
          <div className="inline-flex rounded-md shadow-sm">
            <button
              onClick={() => handleDateRangeChange('day')}
              className={`px-4 py-2 text-sm font-medium rounded-l-lg ${
                dateRange === 'day'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
              }`}
            >
              Day
            </button>
            <button
              onClick={() => handleDateRangeChange('week')}
              className={`px-4 py-2 text-sm font-medium ${
                dateRange === 'week'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
              }`}
            >
              Week
            </button>
            <button
              onClick={() => handleDateRangeChange('month')}
              className={`px-4 py-2 text-sm font-medium rounded-r-lg ${
                dateRange === 'month'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
              }`}
            >
              Month
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400">
                <Users className="h-6 w-6" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Total Users
                </p>
                <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                  24
                </p>
              </div>
            </div>
            <div className="mt-4">
              <div className="flex items-center">
                <span className="text-green-600 dark:text-green-400 text-sm font-medium flex items-center">
                  <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M12 7a1 1 0 10-2 0v4a1 1 0 102 0V7z" clipRule="evenodd" />
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm0-2a6 6 0 100-12 6 6 0 000 12z" clipRule="evenodd" />
                  </svg>
                  +3 this week
                </span>
              </div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400">
                <CheckCircle className="h-6 w-6" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Recognition Rate
                </p>
                <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                  94.2%
                </p>
              </div>
            </div>
            <div className="mt-4">
              <div className="flex items-center">
                <span className="text-green-600 dark:text-green-400 text-sm font-medium flex items-center">
                  <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M12 7a1 1 0 10-2 0v4a1 1 0 102 0V7z" clipRule="evenodd" />
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm0-2a6 6 0 100-12 6 6 0 000 12z" clipRule="evenodd" />
                  </svg>
                  +2.1% improvement
                </span>
              </div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400">
                <XCircle className="h-6 w-6" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  False Positives
                </p>
                <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                  1.8%
                </p>
              </div>
            </div>
            <div className="mt-4">
              <div className="flex items-center">
                <span className="text-green-600 dark:text-green-400 text-sm font-medium flex items-center">
                  <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M12 7a1 1 0 10-2 0v4a1 1 0 102 0V7z" clipRule="evenodd" />
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm0-2a6 6 0 100-12 6 6 0 000 12z" clipRule="evenodd" />
                  </svg>
                  -0.5% decrease
                </span>
              </div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
                <Clock className="h-6 w-6" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Avg. Processing Time
                </p>
                <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                  245ms
                </p>
              </div>
            </div>
            <div className="mt-4">
              <div className="flex items-center">
                <span className="text-green-600 dark:text-green-400 text-sm font-medium flex items-center">
                  <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M12 7a1 1 0 10-2 0v4a1 1 0 102 0V7z" clipRule="evenodd" />
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm0-2a6 6 0 100-12 6 6 0 000 12z" clipRule="evenodd" />
                  </svg>
                  -15ms improvement
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <div className="flex items-center mb-4">
              <LineChartIcon className="h-6 w-6 text-indigo-600 dark:text-indigo-400 mr-2" />
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Accuracy Trend
              </h2>
            </div>
            <div className="h-80">
              <Line options={lineOptions} data={accuracyData} />
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <div className="flex items-center mb-4">
              <BarChartIcon className="h-6 w-6 text-indigo-600 dark:text-indigo-400 mr-2" />
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Most Recognized Faces
              </h2>
            </div>
            <div className="h-80">
              <Bar options={barOptions} data={recognitionsData} />
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <div className="flex items-center mb-4">
              <PieChartIcon className="h-6 w-6 text-indigo-600 dark:text-indigo-400 mr-2" />
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Recognition Status
              </h2>
            </div>
            <div className="h-80">
              <Pie options={pieOptions} data={statusData} />
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <div className="flex items-center mb-4">
              <Calendar className="h-6 w-6 text-indigo-600 dark:text-indigo-400 mr-2" />
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Activity Log
              </h2>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead>
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Confidence
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Timestamp
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {activityLogs.map((log) => (
                    <tr key={log.id}>
                      <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                        {log.name}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm">
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          log.status === 'recognized'
                            ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400'
                            : log.status === 'unknown'
                              ? 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-400'
                              : 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-400'
                        }`}>
                          {log.status === 'recognized'
                            ? 'Recognized'
                            : log.status === 'unknown'
                              ? 'Unknown'
                              : 'Low Confidence'}
                        </span>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                        {Math.round(log.confidence * 100)}%
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                        {log.timestamp}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Export Options */}
        <div className="flex justify-end">
          <button className="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 mr-3">
            Export CSV
          </button>
          <button className="px-4 py-2 bg-indigo-600 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-indigo-700">
            Generate Report
          </button>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;