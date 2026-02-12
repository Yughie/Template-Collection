import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { templateConfig } from '../config/templateConfig';

const Postcard4 = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const config = templateConfig.postcard4;

  // Reduced sparkles for performance
  const sparkles = useMemo(() => Array.from({ length: 12 }, (_, i) => ({
    id: i,
    left: (i * 8.3) % 100,
    top: (i * 8.3) % 100,
    delay: (i * 0.25) % 3,
    size: 4 + (i % 8)
  })), []);

  const nextPage = () => {
    if (currentPage < config.pages.length - 1) {
      setCurrentPage(prev => prev + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(prev => prev - 1);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-purple-800 flex flex-col items-center justify-center p-4 overflow-hidden relative">
      {/* Back Button */}
      <Link to="/" className="absolute top-6 left-6 z-50">
        <motion.button
          className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white font-medium shadow-lg hover:bg-white/30 transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          ← Back
        </motion.button>
      </Link>

      {/* Magical Sparkles */}
      {sparkles.map((sparkle) => (
        <motion.div
          key={sparkle.id}
          className="absolute pointer-events-none"
          style={{ 
            left: `${sparkle.left}%`, 
            top: `${sparkle.top}%`,
            fontSize: sparkle.size
          }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0.5, 1.5, 0.5],
            rotate: [0, 180, 360]
          }}
          transition={{
            duration: 3,
            delay: sparkle.delay,
            repeat: Infinity
          }}
        >
          ✨
        </motion.div>
      ))}

      {/* Book Container */}
      <div className="perspective-1000">
        <AnimatePresence mode="wait">
          {!isOpen ? (
            // Book Cover
            <motion.div
              key="cover"
              className="relative cursor-pointer"
              onClick={() => setIsOpen(true)}
              initial={{ rotateY: 0 }}
              exit={{ rotateY: -120, opacity: 0 }}
              transition={{ duration: 0.8 }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="w-80 md:w-96 h-[500px] bg-gradient-to-br from-rose-700 via-pink-600 to-rose-800 rounded-r-lg rounded-l-sm shadow-2xl relative overflow-hidden">
                {/* Book Spine Effect */}
                <div className="absolute left-0 top-0 bottom-0 w-4 bg-gradient-to-r from-rose-900 to-rose-700" />
                
                {/* Golden Border */}
                <div className="absolute inset-4 border-2 border-amber-400/50 rounded" />
                <div className="absolute inset-6 border border-amber-400/30 rounded" />

                {/* Cover Content */}
                <div className="absolute inset-0 flex flex-col items-center justify-center p-8">
                  <motion.div
                    className="text-6xl mb-4"
                    animate={{ 
                      rotateY: [0, 360],
                      scale: [1, 1.1, 1]
                    }}
                    transition={{ duration: 4, repeat: Infinity }}
                  >
                    📖
                  </motion.div>
                  <h1 className="text-3xl font-serif text-amber-200 text-center mb-2 drop-shadow-lg">
                    {config.title}
                  </h1>
                  <p className="text-amber-300/80 text-center font-serif italic">
                    {config.subtitle}
                  </p>
                  
                  {/* Cover Image */}
                  <motion.div 
                    className="mt-6 w-32 h-32 rounded-full overflow-hidden border-4 border-amber-400/50 shadow-xl"
                    animate={{ boxShadow: ["0 0 20px rgba(251,191,36,0.3)", "0 0 40px rgba(251,191,36,0.6)", "0 0 20px rgba(251,191,36,0.3)"] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <img src={config.coverImage} alt="Cover" className="w-full h-full object-cover" />
                  </motion.div>
                </div>

                {/* Glitter Effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                  animate={{ x: ['-100%', '200%'] }}
                  transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
                />
              </div>
              
              <motion.p
                className="text-center mt-4 text-amber-200/80"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                Click to open ✨
              </motion.p>
            </motion.div>
          ) : (
            // Book Pages
            <motion.div
              key="pages"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="relative"
            >
              <div className="w-[90vw] max-w-4xl bg-amber-50 rounded-lg shadow-2xl overflow-hidden relative">
                {/* Page Content */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentPage}
                    initial={{ opacity: 0, x: 100, rotateY: 90 }}
                    animate={{ opacity: 1, x: 0, rotateY: 0 }}
                    exit={{ opacity: 0, x: -100, rotateY: -90 }}
                    transition={{ duration: 0.5 }}
                    className="p-8 md:p-12 min-h-[500px] flex flex-col md:flex-row gap-8 items-center"
                  >
                    {/* Image Side */}
                    <motion.div 
                      className="w-full md:w-1/2"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.3 }}
                    >
                      <div className="relative">
                        <img 
                          src={config.pages[currentPage].image} 
                          alt={`Page ${currentPage + 1}`}
                          className="w-full rounded-lg shadow-lg"
                        />
                        <div className="absolute inset-0 border-4 border-amber-200/30 rounded-lg" />
                      </div>
                    </motion.div>

                    {/* Text Side */}
                    <div className="w-full md:w-1/2 text-center md:text-left">
                      <motion.h2 
                        className="text-2xl md:text-3xl font-serif text-rose-700 mb-4"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                      >
                        {config.pages[currentPage].title}
                      </motion.h2>
                      <motion.p 
                        className="text-gray-700 font-serif leading-relaxed text-lg"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                      >
                        {config.pages[currentPage].text}
                      </motion.p>
                      
                      {config.pages[currentPage].signature && (
                        <motion.p 
                          className="mt-6 text-rose-600 font-serif italic text-xl"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.7 }}
                        >
                          {config.pages[currentPage].signature}
                        </motion.p>
                      )}
                    </div>
                  </motion.div>
                </AnimatePresence>

                {/* Page Number */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-amber-600 font-serif">
                  {currentPage + 1} / {config.pages.length}
                </div>

                {/* Navigation Buttons */}
                <div className="absolute bottom-4 left-4 right-4 flex justify-between">
                  <motion.button
                    onClick={prevPage}
                    className={`px-4 py-2 rounded-full font-medium ${currentPage === 0 ? 'opacity-30 cursor-not-allowed' : 'bg-rose-500 text-white hover:bg-rose-600'}`}
                    disabled={currentPage === 0}
                    whileHover={currentPage > 0 ? { scale: 1.05 } : {}}
                    whileTap={currentPage > 0 ? { scale: 0.95 } : {}}
                  >
                    ← Previous
                  </motion.button>
                  <motion.button
                    onClick={nextPage}
                    className={`px-4 py-2 rounded-full font-medium ${currentPage === config.pages.length - 1 ? 'opacity-30 cursor-not-allowed' : 'bg-rose-500 text-white hover:bg-rose-600'}`}
                    disabled={currentPage === config.pages.length - 1}
                    whileHover={currentPage < config.pages.length - 1 ? { scale: 1.05 } : {}}
                    whileTap={currentPage < config.pages.length - 1 ? { scale: 0.95 } : {}}
                  >
                    Next →
                  </motion.button>
                </div>

                {/* Decorative Corner Flourishes */}
                <div className="absolute top-4 left-4 text-2xl text-amber-300/50">❦</div>
                <div className="absolute top-4 right-4 text-2xl text-amber-300/50 transform scale-x-[-1]">❦</div>
              </div>

              {/* Close Book Button */}
              <motion.button
                onClick={() => { setIsOpen(false); setCurrentPage(0); }}
                className="mt-6 px-6 py-3 bg-gradient-to-r from-rose-500 to-pink-500 text-white rounded-full font-medium shadow-lg mx-auto block"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Close Book 📖
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Postcard4;
