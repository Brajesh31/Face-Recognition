import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Clock, Download, Trash2, LogOut, Settings, Shield } from 'lucide-react';

const UserProfilePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('profile');
  
  // Mock user data
  const userData = {
    id: '1',
    name: 'John Doe',
    email: 'john.doe@example.com',
    role: 'Administrator',
    createdAt: '2023-01-15',
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg',
    faceCount: 8,
    lastLogin: '2023-06-14 15:32:45'
  };
  
  // Mock recognition history
  const recognitionHistory = [
    { id: 1, location: 'Main Entrance', timestamp: '2023-06-15 09:32:45', confidence: 0.94 },
    { id: 2, location: 'Office Area', timestamp: '2023-06-14 17:15:22', confidence: 0.88 },
    { id: 3, location: 'Conference Room', timestamp: '2023-06-14 13:03:17', confidence: 0.92 },
    { id: 4, location: 'Main Entrance', timestamp: '2023-06-13 09:45:09', confidence: 0.91 },
    { id: 5, location: 'Office Area', timestamp: '2023-06-12 16:22:31', confidence: 0.89 }
  ];
  
  // Mock face images
  const faceImages = [
    { id: 1, url: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg', date: '2023-01-15' },
    { id: 2, url: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg', date: '2023-01-15' },
    { id: 3, url: 'https://images.pexels.com/photos/2613260/pexels-photo-2613260.jpeg', date: '2023-02-22' },
    { id: 4, url: 'https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg', date: '2023-03-10' },
    { id: 5, url: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg', date: '2023-04-05' },
    { id: 6, url: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg', date: '2023-05-18' },
    { id: 7, url: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg', date: '2023-05-30' },
    { id: 8, url: 'https://images.pexels.com/photos/937481/pexels-photo-937481.jpeg', date: '2023-06-12' }
  ];
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
            <div className="md:flex">
              {/* Sidebar */}
              <div className="md:w-1/4 bg-gray-50 dark:bg-gray-700 p-6">
                <div className="flex flex-col items-center text-center mb-8">
                  <img
                    src={userData.avatar}
                    alt={userData.name}
                    className="w-24 h-24 rounded-full object-cover mb-4"
                  />
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                    {userData.name}
                  </h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {userData.email}
                  </p>
                  <div className="mt-2 px-3 py-1 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-800 dark:text-indigo-300 text-xs rounded-full">
                    {userData.role}
                  </div>
                </div>
                
                <nav className="space-y-1">
                  <button
                    onClick={() => setActiveTab('profile')}
                    className={`w-full flex items-center px-4 py-3 rounded-lg transition-colors ${
                      activeTab === 'profile'
                        ? 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600'
                    }`}
                  >
                    <User className="h-5 w-5 mr-3" />
                    Profile
                  </button>
                  
                  <button
                    onClick={() => setActiveTab('history')}
                    className={`w-full flex items-center px-4 py-3 rounded-lg transition-colors ${
                      activeTab === 'history'
                        ? 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600'
                    }`}
                  >
                    <Clock className="h-5 w-5 mr-3" />
                    Recognition History
                  </button>
                  
                  <button
                    onClick={() => setActiveTab('faces')}
                    className={`w-full flex items-center px-4 py-3 rounded-lg transition-colors ${
                      activeTab === 'faces'
                        ? 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600'
                    }`}
                  >
                    <User className="h-5 w-5 mr-3" />
                    Face Images
                  </button>
                  
                  <button
                    onClick={() => setActiveTab('settings')}
                    className={`w-full flex items-center px-4 py-3 rounded-lg transition-colors ${
                      activeTab === 'settings'
                        ? 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600'
                    }`}
                  >
                    <Settings className="h-5 w-5 mr-3" />
                    Settings
                  </button>
                </nav>
                
                <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-600">
                  <button className="w-full flex items-center px-4 py-3 rounded-lg text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors">
                    <LogOut className="h-5 w-5 mr-3" />
                    Sign Out
                  </button>
                </div>
              </div>
              
              {/* Main Content */}
              <div className="md:w-3/4 p-6">
                {/* Profile Tab */}
                {activeTab === 'profile' && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="flex justify-between items-center mb-6">
                      <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                        Profile Information
                      </h2>
                      <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
                        Edit Profile
                      </button>
                    </div>
                    
                    <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 mb-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Full Name</p>
                          <p className="text-gray-900 dark:text-white">{userData.name}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Email</p>
                          <p className="text-gray-900 dark:text-white">{userData.email}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Role</p>
                          <p className="text-gray-900 dark:text-white">{userData.role}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Member Since</p>
                          <p className="text-gray-900 dark:text-white">{userData.createdAt}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Face Images</p>
                          <p className="text-gray-900 dark:text-white">{userData.faceCount}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Last Login</p>
                          <p className="text-gray-900 dark:text-white">{userData.lastLogin}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4 flex items-center">
                        <Shield className="h-5 w-5 mr-2 text-indigo-600 dark:text-indigo-400" />
                        Security Settings
                      </h3>
                      
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="text-gray-900 dark:text-white font-medium">Password</p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Last changed 3 months ago</p>
                          </div>
                          <button className="px-3 py-1 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700">
                            Change
                          </button>
                        </div>
                        
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="text-gray-900 dark:text-white font-medium">Two-Factor Authentication</p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Not enabled</p>
                          </div>
                          <button className="px-3 py-1 bg-indigo-600 text-white rounded-md text-sm hover:bg-indigo-700">
                            Enable
                          </button>
                        </div>
                        
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="text-gray-900 dark:text-white font-medium">Account Data</p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Download or delete your data</p>
                          </div>
                          <div className="flex space-x-2">
                            <button className="px-3 py-1 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center">
                              <Download className="h-4 w-4 mr-1" />
                              Export
                            </button>
                            <button className="px-3 py-1 bg-red-600 text-white rounded-md text-sm hover:bg-red-700 flex items-center">
                              <Trash2 className="h-4 w-4 mr-1" />
                              Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
                
                {/* Recognition History Tab */}
                {activeTab === 'history' && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="flex justify-between items-center mb-6">
                      <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                        Recognition History
                      </h2>
                      <button className="px-4 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors flex items-center">
                        <Download className="h-4 w-4 mr-2" />
                        Export Logs
                      </button>
                    </div>
                    
                    <div className="bg-gray-50 dark:bg-gray-700 rounded-lg overflow-hidden">
                      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-600">
                        <thead className="bg-gray-100 dark:bg-gray-800">
                          <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                              Location
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                              Timestamp
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                              Confidence
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white dark:bg-gray-700 divide-y divide-gray-200 dark:divide-gray-600">
                          {recognitionHistory.map((entry) => (
                            <tr key={entry.id}>
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                                {entry.location}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                                {entry.timestamp}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm">
                                <span className={`px-2 py-1 text-xs rounded-full ${
                                  entry.confidence > 0.9
                                    ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400'
                                    : entry.confidence > 0.8
                                      ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-400'
                                      : 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-400'
                                }`}>
                                  {Math.round(entry.confidence * 100)}%
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    
                    <div className="mt-6 flex justify-between items-center">
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Showing 5 of 42 entries
                      </p>
                      <div className="flex space-x-2">
                        <button className="px-3 py-1 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700">
                          Previous
                        </button>
                        <button className="px-3 py-1 bg-indigo-600 text-white rounded-md text-sm hover:bg-indigo-700">
                          Next
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}
                
                {/* Face Images Tab */}
                {activeTab === 'faces' && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="flex justify-between items-center mb-6">
                      <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                        Face Images
                      </h2>
                      <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
                        Upload New
                      </button>
                    </div>
                    
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                      {faceImages.map((image) => (
                        <div key={image.id} className="relative group">
                          <img
                            src={image.url}
                            alt={`Face ${image.id}`}
                            className="w-full h-40 object-cover rounded-lg"
                          />
                          <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center space-x-2">
                            <button className="p-2 bg-white rounded-full text-gray-800 hover:bg-gray-200">
                              <Download className="h-4 w-4" />
                            </button>
                            <button className="p-2 bg-red-600 rounded-full text-white hover:bg-red-700">
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                            Added: {image.date}
                          </p>
                        </div>
                      ))}
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
                        Account Settings
                      </h2>
                      
                      <div className="space-y-6">
                        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
                          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                            Notification Preferences
                          </h3>
                          
                          <div className="space-y-4">
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="text-gray-900 dark:text-white font-medium">Recognition Alerts</p>
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                  Receive alerts when your face is recognized
                                </p>
                              </div>
                              <label className="relative inline-flex items-center cursor-pointer">
                                <input type="checkbox" className="sr-only peer" defaultChecked />
                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 dark:peer-focus:ring-indigo-800 rounded-full peer dark:bg-gray-600 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-500 peer-checked:bg-indigo-600"></div>
                              </label>
                            </div>
                            
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="text-gray-900 dark:text-white font-medium">Email Notifications</p>
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                  Receive email updates about your account
                                </p>
                              </div>
                              <label className="relative inline-flex items-center cursor-pointer">
                                <input type="checkbox" className="sr-only peer" />
                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 dark:peer-focus:ring-indigo-800 rounded-full peer dark:bg-gray-600 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-500 peer-checked:bg-indigo-600"></div>
                              </label>
                            </div>
                            
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="text-gray-900 dark:text-white font-medium">Security Alerts</p>
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                  Get notified about important security events
                                </p>
                              </div>
                              <label className="relative inline-flex items-center cursor-pointer">
                                <input type="checkbox" className="sr-only peer" defaultChecked />
                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 dark:peer-focus:ring-indigo-800 rounded-full peer dark:bg-gray-600 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-500 peer-checked:bg-indigo-600"></div>
                              </label>
                            </div>
                          </div>
                        </div>
                        
                        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
                          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                            Privacy Settings
                          </h3>
                          
                          <div className="space-y-4">
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="text-gray-900 dark:text-white font-medium">Profile Visibility</p>
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                  Control who can see your profile information
                                </p>
                              </div>
                              <select className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 text-gray-700 dark:text-gray-300">
                                <option>Only Me</option>
                                <option>Team Members</option>
                                <option>Everyone</option>
                              </select>
                            </div>
                            
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="text-gray-900 dark:text-white font-medium">Data Usage</p>
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                  Allow system to use your data for improvements
                                </p>
                              </div>
                              <label className="relative inline-flex items-center cursor-pointer">
                                <input type="checkbox" className="sr-only peer" defaultChecked />
                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 dark:peer-focus:ring-indigo-800 rounded-full peer dark:bg-gray-600 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-500 peer-checked:bg-indigo-600"></div>
                              </label>
                            </div>
                          </div>
                        </div>
                        
                        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
                          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                            Danger Zone
                          </h3>
                          
                          <div className="space-y-4">
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="text-gray-900 dark:text-white font-medium">Delete Account</p>
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                  Permanently delete your account and all data
                                </p>
                              </div>
                              <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
                                Delete
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfilePage;