import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { motion } from 'framer-motion';
import { Upload, X, User, Trash2, RefreshCw, Plus, Check } from 'lucide-react';

const DatasetManagementPage: React.FC = () => {
  const [uploadedImages, setUploadedImages] = useState<Array<{
    id: string;
    file: File;
    preview: string;
    name: string;
  }>>([]);
  
  const [isTraining, setIsTraining] = useState(false);
  const [trainingProgress, setTrainingProgress] = useState(0);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState<'success' | 'error'>('success');
  
  // Mock data for enrolled users
  const [enrolledUsers, setEnrolledUsers] = useState([
    { id: '1', name: 'John Doe', imageCount: 5, avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg' },
    { id: '2', name: 'Jane Smith', imageCount: 8, avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg' },
    { id: '3', name: 'Mike Johnson', imageCount: 3, avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg' }
  ]);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      const newImages = acceptedFiles.map(file => ({
        id: Math.random().toString(36).substring(2, 11),
        file,
        preview: URL.createObjectURL(file),
        name: ''
      }));
      
      setUploadedImages(prev => [...prev, ...newImages]);
      showToastNotification('Images uploaded successfully', 'success');
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png']
    }
  });

  const handleNameChange = (id: string, newName: string) => {
    setUploadedImages(prev => 
      prev.map(img => img.id === id ? { ...img, name: newName } : img)
    );
  };

  const handleDeleteImage = (id: string) => {
    setUploadedImages(prev => prev.filter(img => img.id !== id));
    showToastNotification('Image removed', 'success');
  };

  const handleDeleteUser = (id: string) => {
    setEnrolledUsers(prev => prev.filter(user => user.id !== id));
    showToastNotification('User deleted successfully', 'success');
  };

  const handleTrainModel = () => {
    if (uploadedImages.some(img => !img.name.trim())) {
      showToastNotification('Please label all images before training', 'error');
      return;
    }
    
    setIsTraining(true);
    setTrainingProgress(0);
    
    // Simulate training progress
    const interval = setInterval(() => {
      setTrainingProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsTraining(false);
          showToastNotification('Model training completed successfully', 'success');
          
          // Add new users to enrolled list
          const newUsers = uploadedImages.reduce((acc, img) => {
            if (!acc.some(u => u.name === img.name)) {
              acc.push({
                id: Math.random().toString(36).substring(2, 11),
                name: img.name,
                imageCount: 1,
                avatar: img.preview
              });
            } else {
              const userIndex = acc.findIndex(u => u.name === img.name);
              acc[userIndex].imageCount += 1;
            }
            return acc;
          }, [...enrolledUsers]);
          
          setEnrolledUsers(newUsers);
          setUploadedImages([]);
          
          return 0;
        }
        return prev + 5;
      });
    }, 200);
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
              Dataset Management
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Upload and manage face images to train your recognition model
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Upload Section */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
                Upload Images
              </h2>
              
              <div 
                {...getRootProps()} 
                className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
                  isDragActive 
                    ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20' 
                    : 'border-gray-300 dark:border-gray-700 hover:border-indigo-500 dark:hover:border-indigo-500'
                }`}
              >
                <input {...getInputProps()} />
                <Upload className="h-12 w-12 text-indigo-500 mx-auto mb-4" />
                <p className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {isDragActive ? 'Drop the files here' : 'Drag & drop face images here'}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  or click to select files
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                  Supported formats: JPG, PNG, JPEG
                </p>
              </div>
              
              {/* Uploaded Images */}
              {uploadedImages.length > 0 && (
                <div className="mt-8">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                      Uploaded Images
                    </h3>
                    <button
                      onClick={() => setUploadedImages([])}
                      className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 text-sm font-medium flex items-center"
                    >
                      <Trash2 className="h-4 w-4 mr-1" />
                      Clear All
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {uploadedImages.map((image) => (
                      <div key={image.id} className="relative bg-gray-100 dark:bg-gray-700 rounded-lg p-2">
                        <button
                          onClick={() => handleDeleteImage(image.id)}
                          className="absolute top-3 right-3 bg-red-100 dark:bg-red-900/50 text-red-600 dark:text-red-400 rounded-full p-1 hover:bg-red-200 dark:hover:bg-red-900"
                        >
                          <X className="h-4 w-4" />
                        </button>
                        <img
                          src={image.preview}
                          alt="Preview"
                          className="w-full h-40 object-cover rounded-lg mb-2"
                        />
                        <input
                          type="text"
                          placeholder="Enter name"
                          value={image.name}
                          onChange={(e) => handleNameChange(image.id, e.target.value)}
                          className="w-full p-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                        />
                      </div>
                    ))}
                  </div>
                  
                  {/* Train Model Button */}
                  <div className="mt-6 flex justify-end">
                    <button
                      onClick={handleTrainModel}
                      disabled={isTraining || uploadedImages.length === 0}
                      className={`flex items-center px-6 py-3 rounded-lg font-medium ${
                        isTraining || uploadedImages.length === 0
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
                          Train Model
                        </>
                      )}
                    </button>
                  </div>
                  
                  {/* Training Progress Bar */}
                  {isTraining && (
                    <div className="mt-4">
                      <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-1">
                        <span>Training in progress</span>
                        <span>{trainingProgress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                        <div
                          className="bg-indigo-600 h-2.5 rounded-full"
                          style={{ width: `${trainingProgress}%` }}
                        ></div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Right Column - Enrolled Users */}
          <div>
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                  Enrolled Users
                </h2>
                <span className="bg-indigo-100 dark:bg-indigo-900/30 text-indigo-800 dark:text-indigo-300 text-sm font-medium px-3 py-1 rounded-full">
                  {enrolledUsers.length} Users
                </span>
              </div>
              
              {/* Dataset Health */}
              <div className="mb-6">
                <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-1">
                  <span>Dataset Health</span>
                  <span>Good</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                  <div
                    className="bg-green-500 h-2.5 rounded-full"
                    style={{ width: '85%' }}
                  ></div>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  Recommendation: Add more images per person for better accuracy
                </p>
              </div>
              
              {/* User List */}
              <div className="space-y-4">
                {enrolledUsers.map((user) => (
                  <div 
                    key={user.id}
                    className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
                  >
                    <div className="flex items-center">
                      <img
                        src={user.avatar}
                        alt={user.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div className="ml-3">
                        <p className="font-medium text-gray-900 dark:text-white">
                          {user.name}
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {user.imageCount} images
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => handleDeleteUser(user.id)}
                      className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                ))}
                
                {/* Add New Person Button */}
                <button
                  className="flex items-center justify-center w-full p-3 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg text-gray-600 dark:text-gray-400 hover:border-indigo-500 dark:hover:border-indigo-500 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                >
                  <Plus className="h-5 w-5 mr-2" />
                  Add New Person
                </button>
              </div>
            </div>
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
              <Check className="h-5 w-5 mr-3" />
            ) : (
              <X className="h-5 w-5 mr-3" />
            )}
            <p>{toastMessage}</p>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default DatasetManagementPage;