import React, { useState, useRef, useCallback, useEffect } from 'react';
import Webcam from 'react-webcam';
import { motion } from 'framer-motion';
import { Camera, CameraOff, RefreshCw, Download, Clock, User, AlertCircle } from 'lucide-react';

interface RecognitionLog {
  id: string;
  name: string;
  confidence: number;
  timestamp: Date;
  status: 'recognized' | 'unknown';
}

const LiveRecognitionPage: React.FC = () => {
  const [isWebcamEnabled, setIsWebcamEnabled] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedCamera, setSelectedCamera] = useState<string | undefined>(undefined);
  const [availableCameras, setAvailableCameras] = useState<MediaDeviceInfo[]>([]);
  const [detectedFaces, setDetectedFaces] = useState<Array<{
    id: string;
    name: string;
    confidence: number;
    box: { x: number; y: number; width: number; height: number };
  }>>([]);
  const [recognitionLogs, setRecognitionLogs] = useState<RecognitionLog[]>([]);
  
  const webcamRef = useRef<Webcam>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  // Get available cameras
  const getAvailableCameras = useCallback(async () => {
    try {
      const devices = await navigator.mediaDevices.enumerateDevices();
      const videoDevices = devices.filter(device => device.kind === 'videoinput');
      setAvailableCameras(videoDevices);
      
      if (videoDevices.length > 0 && !selectedCamera) {
        setSelectedCamera(videoDevices[0].deviceId);
      }
    } catch (error) {
      console.error('Error getting cameras:', error);
    }
  }, [selectedCamera]);
  
  useEffect(() => {
    getAvailableCameras();
  }, [getAvailableCameras]);
  
  const toggleWebcam = () => {
    setIsWebcamEnabled(prev => !prev);
    
    if (!isWebcamEnabled) {
      // Start face detection when webcam is enabled
      startFaceDetection();
    } else {
      // Clear detected faces when webcam is disabled
      setDetectedFaces([]);
    }
  };
  
  const handleCameraChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCamera(e.target.value);
  };
  
  const captureImage = () => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      if (imageSrc) {
        // Create a link element to download the image
        const link = document.createElement('a');
        link.href = imageSrc;
        link.download = `face-capture-${new Date().toISOString()}.jpg`;
        link.click();
      }
    }
  };
  
  // Simulate face detection
  const startFaceDetection = useCallback(() => {
    if (!isWebcamEnabled) return;
    
    setIsProcessing(true);
    
    // Simulate processing delay
    setTimeout(() => {
      // Mock detected faces with random positions
      const mockFaces = [
        {
          id: '1',
          name: 'John Doe',
          confidence: 0.92,
          box: {
            x: Math.random() * 200 + 100,
            y: Math.random() * 100 + 50,
            width: 120,
            height: 120
          }
        }
      ];
      
      // Randomly add a second face sometimes
      if (Math.random() > 0.6) {
        mockFaces.push({
          id: '2',
          name: Math.random() > 0.3 ? 'Jane Smith' : 'Unknown',
          confidence: Math.random() > 0.3 ? 0.85 : 0.45,
          box: {
            x: Math.random() * 200 + 300,
            y: Math.random() * 100 + 50,
            width: 120,
            height: 120
          }
        });
      }
      
      setDetectedFaces(mockFaces);
      
      // Add to logs
      const newLogs = mockFaces.map(face => ({
        id: Math.random().toString(36).substring(2, 11),
        name: face.name,
        confidence: face.confidence,
        timestamp: new Date(),
        status: face.confidence > 0.7 ? 'recognized' : 'unknown'
      }));
      
      setRecognitionLogs(prev => [...newLogs, ...prev].slice(0, 20));
      setIsProcessing(false);
      
      // Continue detection
      if (isWebcamEnabled) {
        setTimeout(startFaceDetection, 2000);
      }
    }, 500);
  }, [isWebcamEnabled]);
  
  // Draw face boxes on canvas
  useEffect(() => {
    if (canvasRef.current && webcamRef.current && detectedFaces.length > 0) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      
      if (ctx) {
        // Clear previous drawings
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Draw each face box
        detectedFaces.forEach(face => {
          // Draw rectangle
          ctx.strokeStyle = face.confidence > 0.7 ? '#4ade80' : '#f87171';
          ctx.lineWidth = 3;
          ctx.strokeRect(face.box.x, face.box.y, face.box.width, face.box.height);
          
          // Draw name label
          ctx.fillStyle = face.confidence > 0.7 ? 'rgba(74, 222, 128, 0.8)' : 'rgba(248, 113, 113, 0.8)';
          ctx.fillRect(face.box.x, face.box.y - 30, face.box.width, 30);
          
          ctx.fillStyle = '#ffffff';
          ctx.font = '14px Arial';
          ctx.fillText(
            `${face.name} (${Math.round(face.confidence * 100)}%)`, 
            face.box.x + 5, 
            face.box.y - 10
          );
        });
      }
    }
  }, [detectedFaces]);
  
  // Start detection when webcam is enabled
  useEffect(() => {
    if (isWebcamEnabled) {
      startFaceDetection();
    }
  }, [isWebcamEnabled, startFaceDetection]);
  
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
              Live Recognition
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Real-time face detection and recognition using your webcam
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Webcam View */}
          <div className="lg:col-span-3">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
              <div className="relative">
                {isWebcamEnabled ? (
                  <>
                    <Webcam
                      audio={false}
                      ref={webcamRef}
                      screenshotFormat="image/jpeg"
                      videoConstraints={{
                        deviceId: selectedCamera,
                        width: 1280,
                        height: 720
                      }}
                      className="w-full h-auto rounded-lg"
                    />
                    <canvas
                      ref={canvasRef}
                      width={1280}
                      height={720}
                      className="absolute top-0 left-0 w-full h-full"
                    />
                    
                    {/* Processing Indicator */}
                    {isProcessing && (
                      <div className="absolute top-4 right-4 bg-black/70 text-white px-3 py-1 rounded-full flex items-center">
                        <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                        Processing...
                      </div>
                    )}
                  </>
                ) : (
                  <div className="w-full h-[500px] bg-gray-900 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <Camera className="h-16 w-16 text-gray-500 mx-auto mb-4" />
                      <p className="text-gray-400 text-lg">
                        Webcam is currently disabled
                      </p>
                      <p className="text-gray-500 text-sm mt-2">
                        Click the "Start Webcam" button to begin face recognition
                      </p>
                    </div>
                  </div>
                )}
              </div>
              
              {/* Controls */}
              <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center space-x-4">
                  <button
                    onClick={toggleWebcam}
                    className={`flex items-center px-4 py-2 rounded-lg font-medium ${
                      isWebcamEnabled
                        ? 'bg-red-600 hover:bg-red-700 text-white'
                        : 'bg-indigo-600 hover:bg-indigo-700 text-white'
                    }`}
                  >
                    {isWebcamEnabled ? (
                      <>
                        <CameraOff className="h-5 w-5 mr-2" />
                        Stop Webcam
                      </>
                    ) : (
                      <>
                        <Camera className="h-5 w-5 mr-2" />
                        Start Webcam
                      </>
                    )}
                  </button>
                  
                  <button
                    onClick={captureImage}
                    disabled={!isWebcamEnabled}
                    className={`flex items-center px-4 py-2 rounded-lg font-medium ${
                      !isWebcamEnabled
                        ? 'bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed'
                        : 'bg-green-600 hover:bg-green-700 text-white'
                    }`}
                  >
                    <Download className="h-5 w-5 mr-2" />
                    Capture
                  </button>
                </div>
                
                <div className="flex items-center">
                  <label htmlFor="camera-select" className="text-gray-700 dark:text-gray-300 mr-2">
                    Camera:
                  </label>
                  <select
                    id="camera-select"
                    value={selectedCamera}
                    onChange={handleCameraChange}
                    className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 text-gray-700 dark:text-gray-300"
                  >
                    {availableCameras.map((camera) => (
                      <option key={camera.deviceId} value={camera.deviceId}>
                        {camera.label || `Camera ${camera.deviceId.slice(0, 5)}...`}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Recognition Logs */}
          <div>
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 h-full">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                Recognition Logs
                <span className="ml-auto bg-indigo-100 dark:bg-indigo-900/30 text-indigo-800 dark:text-indigo-300 text-xs font-medium px-2 py-1 rounded-full">
                  Live
                </span>
              </h2>
              
              <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2">
                {recognitionLogs.length > 0 ? (
                  recognitionLogs.map((log) => (
                    <div 
                      key={log.id}
                      className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg border-l-4 border-l-indigo-500"
                    >
                      <div className="flex items-start">
                        <div className={`flex-shrink-0 p-1 rounded-full ${
                          log.status === 'recognized' 
                            ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400' 
                            : 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400'
                        }`}>
                          {log.status === 'recognized' ? (
                            <User className="h-5 w-5" />
                          ) : (
                            <AlertCircle className="h-5 w-5" />
                          )}
                        </div>
                        <div className="ml-3">
                          <p className="font-medium text-gray-900 dark:text-white">
                            {log.name}
                            <span className={`ml-2 text-xs font-normal ${
                              log.confidence > 0.7 
                                ? 'text-green-600 dark:text-green-400' 
                                : 'text-yellow-600 dark:text-yellow-400'
                            }`}>
                              {Math.round(log.confidence * 100)}%
                            </span>
                          </p>
                          <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 mt-1">
                            <Clock className="h-3 w-3 mr-1" />
                            {log.timestamp.toLocaleTimeString()}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <p className="text-gray-500 dark:text-gray-400">
                      No recognition logs yet
                    </p>
                    <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">
                      Start the webcam to begin recognition
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveRecognitionPage;