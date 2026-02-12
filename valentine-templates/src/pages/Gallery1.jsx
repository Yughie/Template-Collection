import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { templateConfig } from '../config/templateConfig';

const Gallery1 = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const config = templateConfig.gallery1;

  // Sparkle particles
  const sparkles = useMemo(() => Array.from({ length: 25 }, (_, i) => ({
    id: i,
    left: (i * 4) % 100,
    top: (i * 4) % 100,
    delay: (i * 0.12) % 3,
    duration: 2 + (i % 2)
  })), []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.8 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-100 to-rose-200 overflow-hidden relative">
      {/* Back Button */}
      <Link to="/" className="fixed top-6 left-6 z-50">
        <motion.button
          className="px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full text-purple-600 font-medium shadow-lg hover:bg-white transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          ← Back
        </motion.button>
      </Link>

      {/* Sparkle Effects */}
      {sparkles.map((sparkle) => (
        <motion.div
          key={sparkle.id}
          className="absolute w-2 h-2 bg-white rounded-full pointer-events-none"
          style={{ left: `${sparkle.left}%`, top: `${sparkle.top}%` }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0, 1.5, 0],
            rotate: [0, 180]
          }}
          transition={{
            duration: sparkle.duration,
            delay: sparkle.delay,
            repeat: Infinity
          }}
        />
      ))}

      {/* Header */}
      <motion.header 
        className="text-center pt-20 pb-12 relative z-10"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <motion.h1 
          className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-purple-500 via-pink-500 to-rose-500 bg-clip-text text-transparent"
          animate={{ 
            backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
          }}
          transition={{ duration: 5, repeat: Infinity }}
          style={{ backgroundSize: '200%' }}
        >
          {config.title}
        </motion.h1>
        <motion.p 
          className="mt-4 text-xl text-pink-600 font-medium"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          ✨ {config.subtitle} ✨
        </motion.p>
      </motion.header>

      {/* Gallery Grid */}
      <motion.div 
        className="max-w-6xl mx-auto px-6 pb-20"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {config.images.map((image, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="cursor-pointer"
              onClick={() => setSelectedImage(image)}
            >
              <motion.div
                className="relative group rounded-2xl overflow-hidden shadow-xl"
                whileHover={{ 
                  scale: 1.05,
                  rotateY: 5,
                  rotateX: -5,
                  boxShadow: "0 25px 50px -12px rgba(168, 85, 247, 0.4)"
                }}
                whileTap={{ scale: 0.98 }}
              >
                {/* Image */}
                <div className="aspect-square overflow-hidden">
                  <motion.img
                    src={image.url}
                    alt={image.caption}
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.5 }}
                  />
                </div>

                {/* Gradient Overlay */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-t from-purple-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                />

                {/* Caption */}
                <motion.div
                  className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300"
                >
                  <p className="text-white font-bold text-lg">{image.caption}</p>
                  <p className="text-pink-200 text-sm">{image.date}</p>
                </motion.div>

                {/* Corner Hearts */}
                <motion.div
                  className="absolute top-3 right-3 text-2xl opacity-0 group-hover:opacity-100 transition-opacity"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  💕
                </motion.div>

                {/* Shimmer Effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full opacity-0 group-hover:opacity-100"
                  animate={{ translateX: ['100%', '-100%'] }}
                  transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 2 }}
                />
              </motion.div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Message Section */}
      <motion.div
        className="max-w-2xl mx-auto px-6 pb-20 text-center"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2 }}
      >
        <motion.div
          className="bg-white/60 backdrop-blur-sm rounded-3xl p-8 shadow-xl"
          whileHover={{ boxShadow: "0 20px 50px rgba(168, 85, 247, 0.3)" }}
        >
          <motion.div
            className="text-4xl mb-4"
            animate={{ 
              scale: [1, 1.2, 1],
              rotate: [0, 10, -10, 0]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            💖
          </motion.div>
          <p className="text-lg text-gray-700 font-serif italic leading-relaxed">
            "{config.message}"
          </p>
          <p className="mt-4 text-purple-600 font-medium">— {config.signature}</p>
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
              className="relative max-w-4xl w-full"
              initial={{ scale: 0.5, opacity: 0, rotateY: 90 }}
              animate={{ scale: 1, opacity: 1, rotateY: 0 }}
              exit={{ scale: 0.5, opacity: 0, rotateY: -90 }}
              transition={{ type: "spring", damping: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={selectedImage.url}
                alt={selectedImage.caption}
                className="w-full rounded-2xl shadow-2xl"
              />
              <motion.div
                className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent rounded-b-2xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <p className="text-white text-2xl font-bold">{selectedImage.caption}</p>
                <p className="text-pink-300 mt-1">{selectedImage.date}</p>
              </motion.div>
              
              <motion.button
                className="absolute top-4 right-4 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white text-xl"
                whileHover={{ scale: 1.1, backgroundColor: "rgba(255,255,255,0.4)" }}
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

export default Gallery1;
