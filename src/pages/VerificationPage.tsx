import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { motion } from 'framer-motion';
import { Upload, RefreshCw, Check, X, GitCompare } from 'lucide-react';

const VerificationPage: React.FC = () => {
  const [image1, setImage1] = useState<{ file: File; preview: string } | null>(null);
  const [image2, setImage2] = useState<{ file: File; preview: string } | null>(null);
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationResult, setVerificationResult] = useState<{
    isMatch: boolean;
    similarity: number;
    embedding1?: number[];
    embedding2?: number[];
  } | null>(null);

  const onDrop1 = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      setImage1({
        file,
        preview: URL.createObjectURL(file)
      });
    }
  }, []);

  const onDrop2 = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      setImage2({
        file,
        preview: URL.createObjectURL(file)
      });
    }
  }, []);

  const { getRootProps: getRootProps1, getInputProps: getInputProps1, isDragActive: isDragActive1 } = useDropzone({
    onDrop: onDrop1,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png']
    },
    maxFiles: 1
  });

  const { getRootProps: getRootProps2, getInputProps: getInputProps2, isDragActive: isDragActive2 } = useDropzone({
    onDrop: onDrop2,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png']
    },
    maxFiles: 1
  });

  const handleVerify = () => {
    if (!image1 || !image2) return;
    
    setIsVerifying(true);
    setVerificationResult(null);
    
    // Simulate verification process
    setTimeout(() => {
      // Generate random embeddings for demonstration
      const mockEmbedding1 = Array.from({ length: 10 }, () => Math.random() * 2 - 1);
      const mockEmbedding2 = Array.from({ length: 10 }, () => Math.random() * 2 - 1);
      
      // Calculate similarity (random for demo)
      const similarity = Math.random();
      const isMatch = similarity > 0.7;
      
      setVerificationResult({
        isMatch,
        similarity,
        embedding1: mockEmbedding1,
        embedding2: mockEmbedding2
      });
      
      setIsVerifying(false);
    }, 2000);
  };

  const resetImages = () => {
    setImage1(null);
    setImage2(null);
    setVerificationResult(null);
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
              Face Verification
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Compare two face images to determine if they belong to the same person
            </p>
          </motion.div>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* First Image Upload */}
              <div>
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  First Image
                </h2>
                
                {image1 ? (
                  <div className="relative">
                    <img
                      src={image1.preview}
                      alt="First face"
                      className="w-full h-64 object-cover rounded-lg"
                    />
                    <button
                      onClick={() => setImage1(null)}
                      className="absolute top-2 right-2 bg-red-100 dark:bg-red-900/50 text-red-600 dark:text-red-400 rounded-full p-1 hover:bg-red-200 dark:hover:bg-red-900"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>
                ) : (
                  <div 
                    {...getRootProps1()} 
                    className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors h-64 flex flex-col items-center justify-center ${
                      isDragActive1 
                        ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20' 
                        : 'border-gray-300 dark:border-gray-700 hover:border-indigo-500 dark:hover:border-indigo-500'
                    }`}
                  >
                    <input {...getInputProps1()} />
                    <Upload className="h-10 w-10 text-indigo-500 mb-4" />
                    <p className="text-gray-700 dark:text-gray-300 font-medium">
                      {isDragActive1 ? 'Drop the image here' : 'Drag & drop an image'}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                      or click to select
                    </p>
                  </div>
                )}
                
                {/* Embedding Display */}
                {verificationResult && verificationResult.embedding1 && (
                  <div className="mt-4 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Face Embedding (truncated):
                    </p>
                    <div className="text-xs font-mono text-gray-600 dark:text-gray-400 overflow-x-auto">
                      [{verificationResult.embedding1.slice(0, 5).map(n => n.toFixed(4)).join(', ')}, ...]
                    </div>
                  </div>
                )}
              </div>
              
              {/* Second Image Upload */}
              <div>
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Second Image
                </h2>
                
                {image2 ? (
                  <div className="relative">
                    <img
                      src={image2.preview}
                      alt="Second face"
                      className="w-full h-64 object-cover rounded-lg"
                    />
                    <button
                      onClick={() => setImage2(null)}
                      className="absolute top-2 right-2 bg-red-100 dark:bg-red-900/50 text-red-600 dark:text-red-400 rounded-full p-1 hover:bg-red-200 dark:hover:bg-red-900"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>
                ) : (
                  <div 
                    {...getRootProps2()} 
                    className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors h-64 flex flex-col items-center justify-center ${
                      isDragActive2 
                        ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20' 
                        : 'border-gray-300 dark:border-gray-700 hover:border-indigo-500 dark:hover:border-indigo-500'
                    }`}
                  >
                    <input {...getInputProps2()} />
                    <Upload className="h-10 w-10 text-indigo-500 mb-4" />
                    <p className="text-gray-700 dark:text-gray-300 font-medium">
                      {isDragActive2 ? 'Drop the image here' : 'Drag & drop an image'}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                      or click to select
                    </p>
                  </div>
                )}
                
                {/* Embedding Display */}
                {verificationResult && verificationResult.embedding2 && (
                  <div className="mt-4 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Face Embedding (truncated):
                    </p>
                    <div className="text-xs font-mono text-gray-600 dark:text-gray-400 overflow-x-auto">
                      [{verificationResult.embedding2.slice(0, 5).map(n => n.toFixed(4)).join(', ')}, ...]
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="mt-8 flex justify-center space-x-4">
              <button
                onClick={handleVerify}
                disabled={!image1 || !image2 || isVerifying}
                className={`flex items-center px-6 py-3 rounded-lg font-medium ${
                  !image1 || !image2 || isVerifying
                    ? 'bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed'
                    : 'bg-indigo-600 hover:bg-indigo-700 text-white'
                }`}
              >
                {isVerifying ? (
                  <>
                    <RefreshCw className="h-5 w-5 mr-2 animate-spin" />
                    Verifying...
                  </>
                ) : (
                  <>
                    <GitCompare className="h-5 w-5 mr-2" />
                    Verify Faces
                  </>
                )}
              </button>
              
              <button
                onClick={resetImages}
                className="px-6 py-3 border border-gray-300 dark:border-gray-600 rounded-lg font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                Reset
              </button>
            </div>
          </div>
          
          {/* Verification Result */}
          {verificationResult && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
            >
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6 text-center">
                Verification Result
              </h2>
              
              <div className="flex flex-col items-center">
                <div className={`w-24 h-24 rounded-full flex items-center justify-center mb-6 ${
                  verificationResult.isMatch
                    ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400'
                    : 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400'
                }`}>
                  {verificationResult.isMatch ? (
                    <Check className="h-12 w-12" />
                  ) : (
                    <X className="h-12 w-12" />
                  )}
                </div>
                
                <div className="text-center mb-8">
                  <h3 className="text-3xl font-bold mb-2">
                    {verificationResult.isMatch ? (
                      <span className="text-green-600 dark:text-green-400">Match</span>
                    ) : (
                      <span className="text-red-600 dark:text-red-400">No Match</span>
                    )}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Similarity Score: {Math.round(verificationResult.similarity * 100)}%
                  </p>
                </div>
                
                {/* Similarity Bar */}
                <div className="w-full max-w-md mb-8">
                  <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-1">
                    <span>Different</span>
                    <span>Threshold</span>
                    <span>Identical</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4 relative">
                    {/* Threshold marker */}
                    <div 
                      className="absolute top-0 bottom-0 w-0.5 bg-gray-800 dark:bg-gray-300" 
                      style={{ left: '70%' }}
                    ></div>
                    
                    {/* Similarity bar */}
                    <div
                      className={`h-4 rounded-full ${
                        verificationResult.isMatch
                          ? 'bg-green-500'
                          : 'bg-red-500'
                      }`}
                      style={{ width: `${verificationResult.similarity * 100}%` }}
                    ></div>
                  </div>
                </div>
                
                {/* Explanation */}
                <div className="text-center max-w-2xl">
                  <p className="text-gray-700 dark:text-gray-300">
                    {verificationResult.isMatch
                      ? 'The system has determined that both images likely contain the same person. The similarity score exceeds our confidence threshold of 70%.'
                      : 'The system has determined that these images likely contain different people. The similarity score is below our confidence threshold of 70%.'}
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VerificationPage;