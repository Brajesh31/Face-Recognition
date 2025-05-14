import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronDown, Scan, Users, ShieldCheck } from 'lucide-react';

const HomePage: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-900/90 to-purple-900/90 z-10"></div>
        
        {/* Background Video */}
        <div className="absolute inset-0 w-full h-full">
          <video
            className="w-full h-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            poster="https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg"
          >
            <source src="https://player.vimeo.com/external/370331493.sd.mp4?s=e90dcaba73c19e0e36f03406b47b5e33cd8b592e&profile_id=139&oauth2_token_id=57447761" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
        
        {/* Hero Content */}
        <div className="container mx-auto px-4 z-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Advanced Face Recognition System
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-3xl mx-auto">
              Powered by cutting-edge AI and machine learning for accurate, real-time face detection and recognition.
            </p>
            <Link
              to="/live-recognition"
              className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-8 rounded-lg transition-colors duration-300 shadow-lg hover:shadow-xl"
            >
              Try Demo
            </Link>
          </motion.div>
          
          {/* Scroll Down Indicator */}
          <motion.div 
            className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            <ChevronDown className="h-8 w-8 text-white/70" />
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Key Features
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Our face recognition system offers powerful capabilities for various applications
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <motion.div
              whileHover={{ y: -10 }}
              className="bg-gray-50 dark:bg-gray-800 p-8 rounded-xl shadow-md"
            >
              <div className="bg-indigo-100 dark:bg-indigo-900/30 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-6">
                <Scan className="h-7 w-7 text-indigo-600 dark:text-indigo-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                Detection
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Accurately detect and locate multiple faces in real-time from images or video streams with precise bounding boxes.
              </p>
            </motion.div>
            
            {/* Feature 2 */}
            <motion.div
              whileHover={{ y: -10 }}
              className="bg-gray-50 dark:bg-gray-800 p-8 rounded-xl shadow-md"
            >
              <div className="bg-indigo-100 dark:bg-indigo-900/30 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-6">
                <Users className="h-7 w-7 text-indigo-600 dark:text-indigo-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                Recognition
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Identify individuals by comparing detected faces against a database of known faces with high confidence scores.
              </p>
            </motion.div>
            
            {/* Feature 3 */}
            <motion.div
              whileHover={{ y: -10 }}
              className="bg-gray-50 dark:bg-gray-800 p-8 rounded-xl shadow-md"
            >
              <div className="bg-indigo-100 dark:bg-indigo-900/30 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-6">
                <ShieldCheck className="h-7 w-7 text-indigo-600 dark:text-indigo-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                Verification
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Verify if two face images belong to the same person with detailed similarity analysis and confidence metrics.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Face Recognition Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <motion.img
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                src="https://images.pexels.com/photos/5380642/pexels-photo-5380642.jpeg"
                alt="Face Recognition Technology"
                className="rounded-lg shadow-xl max-w-full h-auto"
              />
            </div>
            
            <div className="md:w-1/2 md:pl-12">
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
                  Why Face Recognition?
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
                  Face recognition technology offers a seamless, secure, and efficient way to identify individuals without physical contact or manual verification.
                </p>
                
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <div className="flex-shrink-0 h-6 w-6 rounded-full bg-green-500 flex items-center justify-center mt-1">
                      <svg className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <p className="ml-3 text-gray-600 dark:text-gray-400">
                      <span className="font-medium text-gray-900 dark:text-white">Enhanced Security</span> - Prevent unauthorized access with biometric verification
                    </p>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 h-6 w-6 rounded-full bg-green-500 flex items-center justify-center mt-1">
                      <svg className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <p className="ml-3 text-gray-600 dark:text-gray-400">
                      <span className="font-medium text-gray-900 dark:text-white">Contactless Identification</span> - Perfect for health-conscious environments
                    </p>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 h-6 w-6 rounded-full bg-green-500 flex items-center justify-center mt-1">
                      <svg className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <p className="ml-3 text-gray-600 dark:text-gray-400">
                      <span className="font-medium text-gray-900 dark:text-white">Time Efficiency</span> - Instant recognition saves time compared to manual methods
                    </p>
                  </li>
                </ul>
                
                <div className="mt-8">
                  <Link
                    to="/features"
                    className="inline-flex items-center text-indigo-600 dark:text-indigo-400 font-medium hover:text-indigo-800 dark:hover:text-indigo-300"
                  >
                    Learn more about our features
                    <svg className="ml-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-indigo-700">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Ready to experience the power of AI-driven face recognition?
          </h2>
          <p className="text-xl text-indigo-100 mb-8 max-w-3xl mx-auto">
            Start using our advanced face recognition system today and transform how you identify and verify individuals.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link
              to="/dataset"
              className="inline-block bg-white text-indigo-700 font-medium py-3 px-8 rounded-lg transition-colors duration-300 hover:bg-gray-100"
            >
              Get Started
            </Link>
            <Link
              to="/how-it-works"
              className="inline-block bg-transparent border-2 border-white text-white font-medium py-3 px-8 rounded-lg transition-colors duration-300 hover:bg-white/10"
            >
              Learn How It Works
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;