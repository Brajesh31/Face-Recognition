import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Scan, Users, ShieldCheck, Database, BarChart, Lock } from 'lucide-react';

const FeatureCard: React.FC<{
  icon: React.ReactNode;
  title: string;
  description: string;
  details: string;
}> = ({ icon, title, description, details }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden"
    >
      <div className="p-6">
        <div className="flex items-start">
          <div className="flex-shrink-0 bg-indigo-100 dark:bg-indigo-900/30 p-3 rounded-full">
            {icon}
          </div>
          <div className="ml-4">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              {title}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              {description}
            </p>
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-indigo-600 dark:text-indigo-400 font-medium hover:text-indigo-800 dark:hover:text-indigo-300 flex items-center"
            >
              {isExpanded ? 'Show Less' : 'Learn More'}
              <svg
                className={`ml-1 h-5 w-5 transform transition-transform ${
                  isExpanded ? 'rotate-180' : ''
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
      
      {isExpanded && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className="px-6 pb-6 pt-2 border-t border-gray-100 dark:border-gray-700 mt-2"
        >
          <p className="text-gray-600 dark:text-gray-400">
            {details}
          </p>
        </motion.div>
      )}
    </motion.div>
  );
};

const FeaturesPage: React.FC = () => {
  const features = [
    {
      icon: <Scan className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />,
      title: 'Real-time Detection',
      description: 'Detect faces in images and video streams with high accuracy and speed.',
      details: 'Our system uses advanced neural networks to detect faces in real-time with up to 99.5% accuracy. It can identify multiple faces simultaneously, even in challenging lighting conditions or with partial occlusions. The detection algorithm works across various angles and can handle faces as small as 20x20 pixels in the frame.'
    },
    {
      icon: <Users className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />,
      title: 'Multi-face Support',
      description: 'Identify and track multiple faces simultaneously in crowded scenes.',
      details: 'The multi-face recognition capability allows the system to detect, track, and identify up to 100 faces simultaneously in a single frame. Each face is processed independently with individual confidence scores. This feature is perfect for crowd analysis, attendance systems, or security applications where multiple people need to be identified at once.'
    },
    {
      icon: <ShieldCheck className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />,
      title: 'Face Verification',
      description: 'Compare faces to verify identity with high confidence metrics.',
      details: 'Our face verification system compares facial features using 128-dimensional embeddings to determine if two faces belong to the same person. The verification process provides a similarity score and confidence level, making it ideal for access control, identity verification, and secure authentication scenarios. The system is trained to be resistant to spoofing attempts using photos or videos.'
    },
    {
      icon: <Database className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />,
      title: 'Dataset Training',
      description: 'Build and train custom face recognition models with your own data.',
      details: 'The dataset management system allows you to create, maintain, and expand your own face database. You can upload images, label identities, and train the model on your specific use case. The training process uses transfer learning to quickly adapt pre-trained models to your dataset, requiring as few as 5-10 images per person for reliable recognition. The system also includes data augmentation to improve recognition across different conditions.'
    },
    {
      icon: <BarChart className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />,
      title: 'Analytics Dashboard',
      description: 'Track performance metrics and recognition statistics over time.',
      details: `The analytics dashboard provides comprehensive insights into your face recognition system's performance. Track metrics like accuracy, false positive rates, and recognition speed over time. The dashboard visualizes user activity, most frequently recognized faces, and system usage patterns. Custom reports can be generated and exported for compliance or business intelligence purposes.`
    },
    {
      icon: <Lock className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />,
      title: 'Secure Storage',
      description: 'Protect facial data with encryption and secure access controls.',
      details: 'All facial data is protected using industry-standard encryption both in transit and at rest. The system implements strict access controls, audit logging, and compliance with privacy regulations like GDPR. Face embeddings are stored rather than actual images when possible, and all data handling follows privacy-by-design principles to ensure the highest level of security for sensitive biometric information.'
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
              Powerful Features
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Explore the comprehensive capabilities of our face recognition system
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <FeatureCard
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
                details={feature.details}
              />
            </motion.div>
          ))}
        </div>

        {/* Use Cases Section */}
        <div className="mt-24">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Use Cases
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Our face recognition technology can be applied across various industries
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
              <img 
                src="https://images.pexels.com/photos/3205450/pexels-photo-3205450.jpeg" 
                alt="Security" 
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  Security & Access Control
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Secure physical locations and digital assets with biometric authentication. 
                  Ideal for restricted areas, smart buildings, and high-security facilities.
                </p>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
              <img 
                src="https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg" 
                alt="Attendance" 
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  Attendance & Time Tracking
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Automate attendance for schools, universities, and workplaces. 
                  Eliminate buddy punching and streamline time tracking processes.
                </p>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
              <img 
                src="https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg" 
                alt="Customer Experience" 
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  Enhanced Customer Experience
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Provide personalized service by recognizing returning customers. 
                  Create VIP experiences and streamline check-in processes.
                </p>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
              <img 
                src="https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg" 
                alt="Healthcare" 
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  Healthcare & Patient Identification
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Ensure correct patient identification for medical procedures. 
                  Secure access to sensitive medical records and facilities.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturesPage;