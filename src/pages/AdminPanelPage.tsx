import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  Database, 
  RefreshCw, 
  Settings, 
  Shield, 
  AlertTriangle, 
  CheckCircle, 
  XCircle,
  Search,
  Trash2,
  Edit,
  UserPlus
} from 'lucide-react';

const AdminPanelPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('users');
  const [isTraining, setIsTraining] = useState(false);
  const [trainingProgress, setTrainingProgress] = useState(0);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState<'success' | 'error'>('success');
  
  // Mock users data
  const [users, setUsers] = useState([
    { id: '1', name: 'John Doe', email: 'john.doe@example.com', role: 'Administrator', status: 'active', lastLogin: '2023-06-15 09:32:45' },
    { id: '2', name: 'Jane Smith', email: 'jane.smith@example.com', role: 'User', status: 'active', lastLogin: '2023-06-14 15:17:22' },
    { id: '3', name: 'Mike Johnson', email: 'mike.johnson@example.com', role: 'User', status: 'inactive', lastLogin: '2023-06-10 11:05:37' },
    { id: '4', name: 'Sarah Williams', email: 'sarah.williams@example.com', role: 'Moderator', status: 'active', lastLogin: '2023-06-14 16:42:19' },
    { id: '5', name: 'David Brown', email: 'david.brown@example.com', role: 'User', status: 'active', lastLogin: '2023-06-13 14:22:51' }
  ]);
  
  // Mock system logs
  const systemLogs = [
    { id: 1, type: 'info', message: 'System started successfully', timestamp: '2023-06-15 08:00:12' },
    { id: 2, type: 'warning', message: 'High CPU usage detected', timestamp: '2023-06-15 09:15:33' },
    { id: 3, type: 'error', message: 'Database connection failed', timestamp: '2023-06-15 09:17:05' },
    { id: 4, type: 'success', message: 'Database connection restored', timestamp: '2023-06-15 09:20:18' },
    { id: 5, type: 'info', message: 'User John Doe logged in', timestamp: '2023-06-15 09:32:45' },
    { id: 6, type: 'info', message: 'Face recognition model loaded', timestamp: '2023-06-15 09:33:02' },
    { id: 7, type: 'warning', message: 'Low disk space warning', timestamp: '2023-06-15 10:45:27' },
    { id: 8, type: 'info', message: 'Scheduled backup completed', timestamp: '2023-06-15 12:00:00' },
    { id: 9, type: 'info', message: 'User Sarah Williams logged in', timestamp: '2023-06-15 14:42:19' },
    { id: 10, type: 'success', message: 'System update completed', timestamp: '2023-06-15 15:30:45' }
  ];
  
  const handleTrainModel = () => {
    setIsTraining(true);
    setTrainingProgress(0);
    
    // Simulate training progress
    const interval = setInterval(() => {
      setTrainingProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsTraining(false);
          showToastNotification('Model training completed successfully', 'success');
          return 0;
        }
        return prev + 2;
      });
    }, 200);
  };
  
  const handleDeleteUser = (id: string) => {
    setUsers(prev => prev.filter(user => user.id !== id));
    showToastNotification('User deleted successfully', 'success');
  };
  
  const showToastNotification = (message: string, type: 'success' | 'error') => {
    setToastMessage(message);
    setToastType(type);
    setShowToast(true);
    
    setTimeout(() => {
      setShowToast(false);
    }, 3000);
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
              Admin Panel
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Manage users, datasets, and system settings
            </p>
          </motion.div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
          {/* Tabs */}
          <div className="flex border-b border-gray-200 dark:border-gray-700">
            <button
              onClick={() => setActiveTab('users')}
              className={`flex items-center px-6 py-4 text-sm font-medium ${
                activeTab === 'users'
                  ? 'border-b-2 border-indigo-600 text-indigo-600 dark:text-indigo-400 dark:border-indigo-400'
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
              }`}
            >
              <Users className="h-5 w-5 mr-2" />
              Users
            </button>
            
            <button
              onClick={() => setActiveTab('dataset')}
              className={`flex items-center px-6 py-4 text-sm font-medium ${
                activeTab === 'dataset'
                  ? 'border-b-2 border-indigo-600 text-indigo-600 dark:text-indigo-400 dark:border-indigo-400'
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
              }`}
            >
              <Database className="h-5 w-5 mr-2" />
              Dataset
            </button>
            
            <button
              onClick={() => setActiveTab('settings')}
              className={`flex items-center px-6 py-4 text-sm font-medium ${
                activeTab === 'settings'
                  ? 'border-b-2 border-indigo-600 text-indigo-600 dark:text-indigo-400 dark:border-indigo-400'
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
              }`}
            >
              <Settings className="h-5 w-5 mr-2" />
              Settings
            </button>
            
            <button
              onClick={() => setActiveTab('logs')}
              className={`flex items-center px-6 py-4 text-sm font-medium ${
                activeTab === 'logs'
                  ? 'border-b-2 border-indigo-600 text-indigo-600 dark:text-indigo-400 dark:border-indigo-400'
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
              }`}
            >
              <Shield className="h-5 w-5 mr-2" />
              Logs
            </button>
          </div>
          
          {/* Tab Content */}
          <div className="p-6">
            {/* Users Tab */}
            {activeTab === 'users' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                    User Management
                  </h2>
                  
                  <div className="flex space-x-4">
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <Search className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                      </div>
                      <input
                        type="text"
                        placeholder="Search users..."
                        className="pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      />
                    </div>
                    
                    <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors flex items-center">
                      <UserPlus className="h-4 w-4 mr-2" />
                      Add User
                    </button>
                  </div>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead className="bg-gray-50 dark:bg-gray-700">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          Name
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          Email
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          Role
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          Last Login
                        </th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                      {users.map((user) => (
                        <tr key={user.id}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                            {user.name}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                            {user.email}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                            <span className={`px-2 py-1 text-xs rounded-full ${
                              user.role === 'Administrator'
                                ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-400'
                                : user.role === 'Moderator'
                                  ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-400'
                                  : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300'
                            }`}>
                              {user.role}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">
                            <span className={`px-2 py-1 text-xs rounded-full ${
                              user.status === 'active'
                                ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400'
                                : 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-400'
                            }`}>
                              {user.status === 'active' ? 'Active' : 'Inactive'}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                            {user.lastLogin}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-right">
                            <div className="flex justify-end space-x-2">
                              <button className="p-1 text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300">
                                <Edit className="h-5 w-5" />
                              </button>
                              <button 
                                onClick={() => handleDeleteUser(user.id)}
                                className="p-1 text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                              >
                                <Trash2 className="h-5 w-5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                
                <div className="mt-6 flex justify-between items-center">
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Showing {users.length} of {users.length} users
                  </p>
                  <div className="flex space-x-2">
                    <button className="px-3 py-1 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600">
                      Previous
                    </button>
                    <button className="px-3 py-1 bg-indigo-600 text-white rounded-md text-sm hover:bg-indigo-700">
                      Next
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
            
            {/* Dataset Tab */}
            {activeTab === 'dataset' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                    Dataset Management
                  </h2>
                  
                  <div className="flex space-x-4">
                    <button
                      onClick={handleTrainModel}
                      disabled={isTraining}
                      className={`flex items-center px-4 py-2 rounded-lg font-medium ${
                        isTraining
                          ? 'bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed'
                          : 'bg-indigo-600 hover:bg-indigo-700 text-white'
                      }`}
                    >
                      {isTraining ? (
                        <>
                          <RefreshCw className="h-5 w-5 mr-2 animate-spin" />
                          Training...
                        </>
                      ) : (
                        <>
                          <RefreshCw className="h-5 w-5 mr-2" />
                          Retrain Model
                        </>
                      )}
                    </button>
                    
                    <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
                      Clean Dataset
                    </button>
                  </div>
                </div>
                
                {/* Dataset Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                      Total Images
                    </h3>
                    <p className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">
                      1,248
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                      Across 24 individuals
                    </p>
                  </div>
                  
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                      Model Version
                    </h3>
                    <p className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">
                      v2.3.1
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                      Last trained: 2 days ago
                    </p>
                  </div>
                  
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                      Recognition Accuracy
                    </h3>
                    <p className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">
                      94.2%
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                      Based on validation tests
                    </p>
                  </div>
                </div>
                
                {/* Training Progress */}
                {isTraining && (
                  <div className="mb-8 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                      Training Progress
                    </h3>
                    
                    <div className="mb-2 flex justify-between text-sm text-gray-600 dark:text-gray-400">
                      <span>Processing images and training model...</span>
                      <span>{trainingProgress}%</span>
                    </div>
                    
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                      <div
                        className="bg-indigo-600 h-2.5 rounded-full"
                        style={{ width: `${trainingProgress}%` }}
                      ></div>
                    </div>
                    
                    <div className="mt-4 text-sm text-gray-500 dark:text-gray-400">
                      <p>Current step: {trainingProgress < 30 ? 'Preprocessing images' : trainingProgress < 60 ? 'Extracting features' : trainingProgress < 90 ? 'Training classifier' : 'Finalizing model'}</p>
                    </div>
                  </div>
                )}
                
                {/* Dataset Distribution */}
                <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 mb-6">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                    Dataset Distribution
                  </h3>
                  
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                      <thead className="bg-gray-50 dark:bg-gray-700">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                            Person
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                            Images
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                            Quality
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                            Last Updated
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                            John Doe
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                            42
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">
                            <span className="px-2 py-1 text-xs rounded-full bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400">
                              Good
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                            2023-06-12
                          </td>
                        </tr>
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                            Jane Smith
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                            38
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">
                            <span className="px-2 py-1 text-xs rounded-full bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400">
                              Good
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                            2023-06-10
                          </td>
                        </tr>
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                            Mike Johnson
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                            27
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">
                            <span className="px-2 py-1 text-xs rounded-full bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-400">
                              Average
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                            2023-06-05
                          </td>
                        </tr>
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                            Sarah Williams
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                            23
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">
                            <span className="px-2 py-1 text-xs rounded-full bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-400">
                              Poor
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                            2023-06-01
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                
                {/* Data Quality Recommendations */}
                <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-6">
                  <div className="flex items-start">
                    <AlertTriangle className="h-6 w-6 text-yellow-600 dark:text-yellow-400 mr-3 flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="text-lg font-medium text-yellow-800 dark:text-yellow-300 mb-2">
                        Dataset Recommendations
                      </h3>
                      <ul className="list-disc list-inside text-sm text-yellow-700 dark:text-yellow-200 space-y-1">
                        <li>Add more images for Sarah Williams (minimum 30 recommended)</li>
                        <li>Improve image quality for Mike Johnson (better lighting conditions)</li>
                        <li>Consider adding more varied angles for all individuals</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
            
            {/* Settings Tab */}
            {activeTab === 'settings' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <div className="mb-6">
                  <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
                    System Settings
                  </h2>
                  
                  <div className="space-y-6">
                    {/* Recognition Settings */}
                    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                        Recognition Settings
                      </h3>
                      
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Confidence Threshold
                          </label>
                          <div className="flex items-center">
                            <input
                              type="range"
                              min="0"
                              max="100"
                              defaultValue="70"
                              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                            />
                            <span className="ml-3 text-gray-700 dark:text-gray-300 min-w-[40px]">
                              70%
                            </span>
                          </div>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                            Minimum confidence level required for a positive match
                          </p>
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Maximum Detection Count
                          </label>
                          <select className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 text-gray-700 dark:text-gray-300 w-full">
                            <option>5</option>
                            <option>10</option>
                            <option selected>20</option>
                            <option>50</option>
                            <option>100</option>
                          </select>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                            Maximum number of faces to detect in a single frame
                          </p>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                              Enable Face Tracking
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              Track faces across video frames to improve performance
                            </p>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" className="sr-only peer" defaultChecked />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 dark:peer-focus:ring-indigo-800 rounded-full peer dark:bg-gray-600 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-500 peer-checked:bg-indigo-600"></div>
                          </label>
                        </div>
                      </div>
                    </div>
                    
                    {/* System Settings */}
                    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                        System Settings
                      </h3>
                      
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                              Enable Logging
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              Record detailed system logs for troubleshooting
                            </p>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" className="sr-only peer" defaultChecked />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 dark:peer-focus:ring-indigo-800 rounded-full peer dark:bg-gray-600 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-500 peer-checked:bg-indigo-600"></div>
                          </label>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                              Automatic Updates
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              Automatically install system updates when available
                            </p>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" className="sr-only peer" defaultChecked />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 dark:peer-focus:ring-indigo-800 rounded-full peer dark:bg-gray-600 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-500 peer-checked:bg-indigo-600"></div>
                          </label>
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Log Retention Period
                          </label>
                          <select className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 text-gray-700 dark:text-gray-300 w-full">
                            <option>7 days</option>
                            <option>14 days</option>
                            <option selected>30 days</option>
                            <option>90 days</option>
                            <option>1 year</option>
                          </select>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                            How long to keep system logs before automatic deletion
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    {/* Security Settings */}
                    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                        Security Settings
                      </h3>
                      
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                              Two-Factor Authentication
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              Require 2FA for all administrator accounts
                            </p>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" className="sr-only peer" defaultChecked />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 dark:peer-focus:ring-indigo-800 rounded-full peer dark:bg-gray-600 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-500 peer-checked:bg-indigo-600"></div>
                          </label>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                              API Access
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              Allow external API access to the system
                            </p>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" className="sr-only peer" />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 dark:peer-focus:ring-indigo-800 rounded-full peer dark:bg-gray-600 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-500 peer-checked:bg-indigo-600"></div>
                          </label>
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Session Timeout
                          </label>
                          <select className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 text-gray-700 dark:text-gray-300 w-full">
                            <option>15 minutes</option>
                            <option selected>30 minutes</option>
                            <option>1 hour</option>
                            <option>4 hours</option>
                            <option>8 hours</option>
                          </select>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                            Automatically log out inactive users after this period
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex justify-end">
                      <button className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors mr-3">
                        Reset to Defaults
                      </button>
                      <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
                        Save Changes
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
            
            {/* Logs Tab */}
            {activeTab === 'logs' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                    System Logs
                  </h2>
                  
                  <div className="flex space-x-4">
                    <select className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 text-gray-700 dark:text-gray-300">
                      <option value="all">All Logs</option>
                      <option value="info">Info</option>
                      <option value="warning">Warnings</option>
                      <option value="error">Errors</option>
                      <option value="success">Success</option>
                    </select>
                    
                    <button className="px-4 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors">
                      Export Logs
                    </button>
                  </div>
                </div>
                
                <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                      <thead className="bg-gray-50 dark:bg-gray-700">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                            Timestamp
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                            Type
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                            Message
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                        {systemLogs.map((log) => (
                          <tr key={log.id}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                              {log.timestamp}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm">
                              {log.type === 'info' && (
                                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-400">
                                  <svg className="h-2 w-2 mr-1" fill="currentColor" viewBox="0 0 8 8">
                                    <circle cx="4" cy="4" r="3" />
                                  </svg>
                                  Info
                                </span>
                              )}
                              {log.type === 'warning' && (
                                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-400">
                                  <AlertTriangle className="h-3 w-3 mr-1" />
                                  Warning
                                </span>
                              )}
                              {log.type === 'error' && (
                                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-400">
                                  <XCircle className="h-3 w-3 mr-1" />
                                  Error
                                </span>
                              )}
                              {log.type === 'success' && (
                                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400">
                                  <CheckCircle className="h-3 w-3 mr-1" />
                                  Success
                                </span>
                              )}
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">
                              {log.message}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
                
                <div className="mt-6 flex justify-between items-center">
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Showing 10 of 1,248 logs
                  </p>
                  <div className="flex space-x-2">
                    <button className="px-3 py-1 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600">
                      Previous
                    </button>
                    <button className="px-3 py-1 bg-indigo-600 text-white rounded-md text-sm hover:bg-indigo-700">
                      Next
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
      
      {/* Toast Notification */}
      {showToast && (
        <div className="fixed bottom-4 right-4 z-50">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className={`flex items-center p-4 rounded-lg shadow-lg ${
              toastType === 'success' 
                ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
                : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
            }`}
          >
            {toastType === 'success' ? (
              <CheckCircle className="h-5 w-5 mr-3" />
            ) : (
              <XCircle className="h-5 w-5 mr-3" />
            )}
            <p>{toastMessage}</p>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default AdminPanelPage;