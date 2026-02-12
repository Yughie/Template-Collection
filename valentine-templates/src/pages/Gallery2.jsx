import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { templateConfig } from '../config/templateConfig';

const Gallery2 = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const config = templateConfig.gallery2;

  // Random rotations for polaroids
  const getRandomRotation = (index) => {
    const rotations = [-12, 8, -5, 10, -8, 6, -10, 12];
    return rotations[index % rotations.length];
  };

  // Floating elements
  const floatingElements = useMemo(() => Array.from({ length: 20 }, (_, i) => ({
    id: i,
    emoji: ['💕', '✨', '💗', '🌸', '💖', '⭐'][i % 6],
    left: (i * 5) % 100,
    delay: (i * 0.25) % 5,
    duration: 8 + (i % 8),
    size: 15 + (i % 20)
  })), []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.5
      }
    }
  };

  const polaroidVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0,
      rotate: -30,
      y: 100
    },
    visible: (i) => ({ 
      opacity: 1, 
      scale: 1,
      rotate: getRandomRotation(i),
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
        delay: i * 0.1
      }
    })
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-100 via-pink-100 to-rose-200 overflow-hidden relative">
      {/* Back Button */}
      <Link to="/" className="fixed top-6 left-6 z-50">
        <motion.button
          className="px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full text-cyan-600 font-medium shadow-lg hover:bg-white transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          ← Back
        </motion.button>
      </Link>

      {/* Floating Elements */}
      {floatingElements.map((el) => (
        <motion.div
          key={el.id}
          className="absolute pointer-events-none"
          style={{ 
            left: `${el.left}%`, 
            top: -50,
            fontSize: el.size
          }}
          animate={{
            y: [0, window.innerHeight + 100],
            rotate: [0, 360],
            x: [0, Math.sin(el.id) * 50, 0]
          }}
          transition={{
            duration: el.duration,
            delay: el.delay,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          {el.emoji}
        </motion.div>
      ))}

      {/* Header */}
      <motion.header 
        className="text-center pt-20 pb-8 relative z-10"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <motion.div
          className="inline-block"
          animate={{ rotate: [-2, 2, -2] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          <h1 className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 via-pink-500 to-rose-500">
            {config.title}
          </h1>
        </motion.div>
        <motion.p 
          className="mt-4 text-xl text-pink-600 font-medium"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          📸 {config.subtitle} 📸
        </motion.p>
      </motion.header>

      {/* Polaroid Grid - Scattered Layout */}
      <motion.div 
        className="max-w-6xl mx-auto px-6 pb-20 relative"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="flex flex-wrap justify-center gap-4 md:gap-8">
          {config.images.map((image, index) => (
            <motion.div
              key={index}
              custom={index}
              variants={polaroidVariants}
              className="cursor-pointer"
              onClick={() => setSelectedImage(image)}
              whileHover={{ 
                scale: 1.1, 
                rotate: 0,
                zIndex: 50,
                boxShadow: "0 30px 60px rgba(0,0,0,0.3)"
              }}
              whileTap={{ scale: 0.95 }}
            >
              {/* Polaroid Frame */}
              <div className="bg-white p-3 pb-12 rounded shadow-xl relative" style={{ width: 200 }}>
                {/* Photo */}
                <div className="aspect-square overflow-hidden bg-gray-100">
                  <motion.img
                    src={image.url}
                    alt={image.note}
                    className="w-full h-full object-cover"
                    initial={{ filter: 'grayscale(30%)' }}
                    whileHover={{ filter: 'grayscale(0%)' }}
                  />
                </div>
                
                {/* Handwritten Note */}
                <motion.p 
                  className="absolute bottom-3 left-0 right-0 text-center font-['Comic_Sans_MS',_cursive] text-gray-600 text-sm px-2"
                  style={{ fontFamily: "'Caveat', cursive, sans-serif" }}
                >
                  {image.note}
                </motion.p>

                {/* Tape effect */}
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-12 h-6 bg-yellow-200/70 transform rotate-2" />
                
                {/* Small decorations */}
                <motion.div
                  className="absolute -bottom-2 -right-2 text-lg"
                  animate={{ rotate: [0, 20, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  💕
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Closing Message */}
      <motion.div
        className="max-w-2xl mx-auto px-6 pb-20 text-center"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5 }}
      >
        <motion.div
          className="bg-white rounded-2xl p-8 shadow-xl relative"
          style={{ transform: 'rotate(-1deg)' }}
          whileHover={{ rotate: 0, boxShadow: "0 20px 50px rgba(0,0,0,0.2)" }}
        >
          {/* Decorative tape */}
          <div className="absolute -top-3 left-8 w-16 h-6 bg-pink-200/70 transform -rotate-6" />
          <div className="absolute -top-3 right-8 w-16 h-6 bg-cyan-200/70 transform rotate-6" />
          
          <motion.div
            className="text-4xl mb-4"
            animate={{ 
              scale: [1, 1.2, 1]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            💝
          </motion.div>
          
          <p className="text-lg text-gray-700 font-['Caveat',_cursive] text-xl leading-relaxed">
            {config.closingNote}
          </p>
          
          <p className="mt-4 text-pink-500 font-bold">
            — {config.from}
          </p>
        </motion.div>
      </motion.div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              className="bg-white p-4 pb-16 rounded-lg shadow-2xl max-w-lg w-full relative"
              initial={{ 
                scale: 0.3, 
                opacity: 0, 
                rotate: -20,
                y: 100 
              }}
              animate={{ 
                scale: 1, 
                opacity: 1, 
                rotate: 0,
                y: 0
              }}
              exit={{ 
                scale: 0.3, 
                opacity: 0, 
                rotate: 20,
                y: 100 
              }}
              transition={{ type: "spring", damping: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={selectedImage.url}
                alt={selectedImage.note}
                className="w-full aspect-square object-cover"
              />
              <motion.p 
                className="absolute bottom-4 left-0 right-0 text-center font-['Caveat',_cursive] text-gray-600 text-2xl"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                {selectedImage.note}
              </motion.p>
              
              <motion.button
                className="absolute top-2 right-2 w-8 h-8 bg-pink-500 rounded-full flex items-center justify-center text-white text-lg shadow-lg"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setSelectedImage(null)}
              >
                ×
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Gallery2;
