import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Camera, Image, Cpu, GitCompare, CheckCircle } from 'lucide-react';

const HowItWorksPage: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);
  
  const steps = [
    {
      title: 'Image Capture',
      icon: <Camera className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />,
      description: 'The system captures an image from a camera or processes an uploaded photo.',
      details: 'The process begins with acquiring an image from a webcam, surveillance camera, or uploaded file. The system supports various image formats (JPEG, PNG, BMP) and can process video streams in real-time at up to 30 frames per second. For optimal results, the face should be visible and well-lit, though our advanced algorithms can handle challenging conditions.',
      codeSnippet: `// Capture image from webcam
const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

// Draw the video frame to the canvas
context.drawImage(video, 0, 0, canvas.width, canvas.height);
const imageData = canvas.toDataURL('image/jpeg');`,
      image: 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg'
    },
    {
      title: 'Preprocessing',
      icon: <Image className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />,
      description: 'The image is normalized, aligned, and prepared for face detection.',
      details: `Before face detection, the image undergoes preprocessing to improve recognition accuracy. This includes color normalization, resizing to a standard resolution, and applying filters to enhance features. For faces that aren't perfectly aligned, the system performs face alignment using facial landmarks (eyes, nose, mouth) to standardize the orientation.`,
      codeSnippet: `// Preprocess image for face detection
function preprocessImage(img) {
  // Convert to grayscale for faster processing
  const gray = cv.cvtColor(img, cv.COLOR_RGBA2GRAY);
  
  // Apply histogram equalization for better contrast
  const equalized = cv.equalizeHist(gray);
  
  // Resize to standard dimensions
  const resized = new cv.Mat();
  cv.resize(equalized, resized, new cv.Size(224, 224));
  
  return resized;
}`,
      image: 'https://images.pexels.com/photos/3861958/pexels-photo-3861958.jpeg'
    },
    {
      title: 'Face Embedding',
      icon: <Cpu className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />,
      description: 'Neural networks extract unique facial features into a numerical vector.',
      details: 'The core of the recognition system is the embedding generation. A deep convolutional neural network (CNN) processes the aligned face and generates a 128-dimensional vector (embedding) that represents the unique facial features. This compact representation captures the essence of a person\'s face in a way that similar faces have similar embeddings. Our system uses a modified FaceNet architecture trained on millions of faces to achieve high accuracy.',
      codeSnippet: `// Generate face embedding using TensorFlow.js
async function generateEmbedding(faceImage) {
  // Load pre-trained model
  const model = await tf.loadLayersModel('model/facenet/model.json');
  
  // Preprocess image for the model
  const tensor = tf.browser.fromPixels(faceImage)
    .resizeNearestNeighbor([160, 160])
    .toFloat()
    .expandDims();
  
  // Generate embedding
  const embedding = await model.predict(tensor).data();
  
  return Array.from(embedding);
}`,
      image: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg'
    },
    {
      title: 'Comparison',
      icon: <GitCompare className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />,
      description: 'The system compares the extracted embedding with the database of known faces.',
      details: 'Once the embedding is generated, it\'s compared against the database of known face embeddings. The comparison uses cosine similarity or Euclidean distance to measure how close the new embedding is to existing ones. The system can perform 1:1 verification (comparing against a specific person) or 1:N identification (searching the entire database). For large databases, optimized search algorithms ensure fast matching even with thousands of registered faces.',
      codeSnippet: `// Compare face embeddings using cosine similarity
function compareFaces(embedding1, embedding2) {
  // Calculate dot product
  const dotProduct = embedding1.reduce((sum, val, i) => 
    sum + val * embedding2[i], 0);
  
  // Calculate magnitudes
  const mag1 = Math.sqrt(embedding1.reduce((sum, val) => 
    sum + val * val, 0));
  const mag2 = Math.sqrt(embedding2.reduce((sum, val) => 
    sum + val * val, 0));
  
  // Cosine similarity (1 = identical, 0 = completely different)
  const similarity = dotProduct / (mag1 * mag2);
  
  return similarity;
}`,
      image: 'https://images.pexels.com/photos/3861958/pexels-photo-3861958.jpeg'
    },
    {
      title: 'Result',
      icon: <CheckCircle className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />,
      description: 'The system returns identification results with confidence scores.',
      details: 'The final step presents the recognition results. For each detected face, the system provides the identity of the closest match along with a confidence score. If the confidence is below a configurable threshold, the face is marked as "Unknown." The results can be displayed visually with bounding boxes and labels, stored in a database for audit trails, or trigger automated actions like access control. The entire process from image capture to result typically takes less than 500ms on modern hardware.',
      codeSnippet: `// Process recognition results
function handleRecognitionResults(results) {
  results.forEach(person => {
    if (person.confidence > CONFIDENCE_THRESHOLD) {
      console.log(\`Identified: \${person.name} (Confidence: \${person.confidence.toFixed(2)})\`);
      
      // Draw bounding box and label on the video frame
      drawBox(person.boundingBox, person.name);
      
      // Log the recognition event
      logRecognitionEvent({
        name: person.name,
        confidence: person.confidence,
        timestamp: new Date().toISOString()
      });
    } else {
      console.log(\`Unknown person (Confidence too low: \${person.confidence.toFixed(2)})\`);
    }
  });
}`,
      image: 'https://images.pexels.com/photos/5380642/pexels-photo-5380642.jpeg'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              How It Works
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Explore the technical pipeline behind our face recognition system
            </p>
          </motion.div>
        </div>

        {/* Timeline Steps */}
        <div className="flex flex-col md:flex-row mb-12">
          <div className="md:w-1/3 mb-8 md:mb-0 md:pr-8">
            <div className="sticky top-24">
              <div className="space-y-1">
                {steps.map((step, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveStep(index)}
                    className={`w-full flex items-center p-4 rounded-lg transition-colors ${
                      activeStep === index
                        ? 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300'
                        : 'hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300'
                    }`}
                  >
                    <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
                      activeStep === index
                        ? 'bg-indigo-600 text-white'
                        : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                    }`}>
                      {index + 1}
                    </div>
                    <span className="ml-4 font-medium">{step.title}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="md:w-2/3">
            <motion.div
              key={activeStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden"
            >
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <div className="bg-indigo-100 dark:bg-indigo-900/30 p-3 rounded-full">
                    {steps[activeStep].icon}
                  </div>
                  <h2 className="ml-4 text-2xl font-bold text-gray-900 dark:text-white">
                    {steps[activeStep].title}
                  </h2>
                </div>

                <p className="text-gray-600 dark:text-gray-400 mb-6 text-lg">
                  {steps[activeStep].description}
                </p>

                <div className="mb-8">
                  <img
                    src={steps[activeStep].image}
                    alt={steps[activeStep].title}
                    className="w-full h-64 object-cover rounded-lg"
                  />
                </div>

                <div className="mb-6">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                    Technical Details
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {steps[activeStep].details}
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                    Code Example
                  </h3>
                  <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
                    <code>{steps[activeStep].codeSnippet}</code>
                  </pre>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Technical Diagram */}
        <div className="mt-20">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              System Architecture
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              A high-level overview of our face recognition pipeline
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
            <div className="flex flex-col items-center">
              <div className="w-full max-w-4xl">
                <svg viewBox="0 0 800 400" className="w-full h-auto">
                  {/* Input Layer */}
                  <rect x="50" y="150" width="100" height="100" rx="10" fill="#818cf8" />
                  <text x="100" y="200" textAnchor="middle" fill="white" fontWeight="bold">Input</text>
                  
                  {/* Arrow */}
                  <path d="M150 200 L200 200" stroke="#6b7280" strokeWidth="3" markerEnd="url(#arrowhead)" />
                  
                  {/* Preprocessing */}
                  <rect x="200" y="150" width="100" height="100" rx="10" fill="#818cf8" />
                  <text x="250" y="200" textAnchor="middle" fill="white" fontWeight="bold">Preprocess</text>
                  
                  {/* Arrow */}
                  <path d="M300 200 L350 200" stroke="#6b7280" strokeWidth="3" markerEnd="url(#arrowhead)" />
                  
                  {/* CNN */}
                  <rect x="350" y="120" width="150" height="160" rx="10" fill="#6366f1" />
                  <text x="425" y="160" textAnchor="middle" fill="white" fontWeight="bold">CNN Model</text>
                  <rect x="370" y="170" width="110" height="20" rx="5" fill="#4f46e5" />
                  <rect x="370" y="200" width="110" height="20" rx="5" fill="#4f46e5" />
                  <rect x="370" y="230" width="110" height="20" rx="5" fill="#4f46e5" />
                  
                  {/* Arrow */}
                  <path d="M500 200 L550 200" stroke="#6b7280" strokeWidth="3" markerEnd="url(#arrowhead)" />
                  
                  {/* Embedding */}
                  <rect x="550" y="150" width="100" height="100" rx="10" fill="#818cf8" />
                  <text x="600" y="200" textAnchor="middle" fill="white" fontWeight="bold">Embedding</text>
                  
                  {/* Arrow */}
                  <path d="M650 200 L700 200" stroke="#6b7280" strokeWidth="3" markerEnd="url(#arrowhead)" />
                  
                  {/* Output */}
                  <rect x="700" y="150" width="100" height="100" rx="10" fill="#818cf8" />
                  <text x="750" y="200" textAnchor="middle" fill="white" fontWeight="bold">Result</text>
                  
                  {/* Database Connection */}
                  <rect x="550" y="300" width="100" height="50" rx="10" fill="#a5b4fc" />
                  <text x="600" y="330" textAnchor="middle" fill="white" fontWeight="bold">Database</text>
                  <path d="M600 250 L600 300" stroke="#6b7280" strokeWidth="3" markerEnd="url(#arrowhead)" />
                  
                  {/* Arrow Marker Definition */}
                  <defs>
                    <marker
                      id="arrowhead"
                      markerWidth="10"
                      markerHeight="7"
                      refX="9"
                      refY="3.5"
                      orient="auto"
                    >
                      <polygon points="0 0, 10 3.5, 0 7" fill="#6b7280" />
                    </marker>
                  </defs>
                </svg>
              </div>
              
              <div className="mt-8 text-left max-w-4xl">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  Key Components
                </h3>
                <ul className="space-y-3 text-gray-600 dark:text-gray-400">
                  <li className="flex items-start">
                    <div className="flex-shrink-0 h-5 w-5 rounded-full bg-indigo-500 mt-1"></div>
                    <p className="ml-3"><span className="font-medium text-gray-900 dark:text-white">Input Layer:</span> Processes images from cameras or uploaded files</p>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 h-5 w-5 rounded-full bg-indigo-500 mt-1"></div>
                    <p className="ml-3"><span className="font-medium text-gray-900 dark:text-white">Preprocessing:</span> Normalizes images and detects face regions</p>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 h-5 w-5 rounded-full bg-indigo-500 mt-1"></div>
                    <p className="ml-3"><span className="font-medium text-gray-900 dark:text-white">CNN Model:</span> Deep neural network that extracts facial features</p>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 h-5 w-5 rounded-full bg-indigo-500 mt-1"></div>
                    <p className="ml-3"><span className="font-medium text-gray-900 dark:text-white">Embedding Layer:</span> Generates 128-dimensional face vectors</p>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 h-5 w-5 rounded-full bg-indigo-500 mt-1"></div>
                    <p className="ml-3"><span className="font-medium text-gray-900 dark:text-white">Database:</span> Stores known face embeddings for comparison</p>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 h-5 w-5 rounded-full bg-indigo-500 mt-1"></div>
                    <p className="ml-3"><span className="font-medium text-gray-900 dark:text-white">Result Layer:</span> Provides identification with confidence scores</p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorksPage;