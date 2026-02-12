import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { templateConfig } from '../config/templateConfig';

const Gallery4 = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const config = templateConfig.gallery4;

  // Auto-rotate carousel
  useEffect(() => {
    if (isAutoPlaying) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % config.images.length);
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [isAutoPlaying, config.images.length]);

  const goToSlide = (index) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const nextSlide = () => {
    goToSlide((currentIndex + 1) % config.images.length);
  };

  const prevSlide = () => {
    goToSlide((currentIndex - 1 + config.images.length) % config.images.length);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-900 via-pink-900 to-purple-900 flex flex-col items-center justify-center p-4 overflow-hidden relative">
      {/* Back Button */}
      <Link to="/" className="fixed top-6 left-6 z-50">
        <motion.button
          className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white font-medium shadow-lg hover:bg-white/30 transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          ← Back
        </motion.button>
      </Link>

      {/* Ambient Lights */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-64 h-64 rounded-full pointer-events-none"
          style={{
            background: `radial-gradient(circle, ${['rgba(255,182,193,0.15)', 'rgba(219,112,147,0.15)', 'rgba(255,105,180,0.15)'][i % 3]}, transparent)`,
            left: `${(i * 20) % 100}%`,
            top: `${(i * 17) % 100}%`
          }}
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{
            duration: 5 + i,
            repeat: Infinity
          }}
        />
      ))}

      {/* Header */}
      <motion.div
        className="text-center mb-8 relative z-10"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
          {config.title}
        </h1>
        <p className="text-pink-200">{config.subtitle}</p>
      </motion.div>

      {/* 3D Carousel */}
      <div className="relative w-full max-w-4xl h-[400px] md:h-[500px] perspective-1000">
        {/* Main Display */}
        <div className="relative w-full h-full flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              className="absolute w-[80vw] max-w-lg aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl"
              initial={{ opacity: 0, scale: 0.8, rotateY: 90 }}
              animate={{ opacity: 1, scale: 1, rotateY: 0 }}
              exit={{ opacity: 0, scale: 0.8, rotateY: -90 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
            >
              {/* Image */}
              <img
                src={config.images[currentIndex].url}
                alt={config.images[currentIndex].caption}
                className="w-full h-full object-cover"
              />
              
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              
              {/* Caption */}
              <motion.div
                className="absolute bottom-0 left-0 right-0 p-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <h3 className="text-white text-2xl font-bold mb-1">
                  {config.images[currentIndex].caption}
                </h3>
                <p className="text-pink-200">
                  {config.images[currentIndex].date}
                </p>
              </motion.div>

              {/* Frame Border */}
              <div className="absolute inset-0 border-4 border-white/20 rounded-2xl pointer-events-none" />
              
              {/* Corner Decorations */}
              <div className="absolute top-4 left-4 text-2xl opacity-60">✨</div>
              <div className="absolute top-4 right-4 text-2xl opacity-60">💕</div>
            </motion.div>
          </AnimatePresence>

          {/* Side Preview Cards */}
          <motion.div
            className="absolute left-4 md:left-12 w-24 md:w-32 aspect-[4/3] rounded-lg overflow-hidden opacity-40 cursor-pointer hidden sm:block"
            whileHover={{ opacity: 0.7, scale: 1.05 }}
            onClick={prevSlide}
          >
            <img
              src={config.images[(currentIndex - 1 + config.images.length) % config.images.length].url}
              alt="Previous"
              className="w-full h-full object-cover"
            />
          </motion.div>

          <motion.div
            className="absolute right-4 md:right-12 w-24 md:w-32 aspect-[4/3] rounded-lg overflow-hidden opacity-40 cursor-pointer hidden sm:block"
            whileHover={{ opacity: 0.7, scale: 1.05 }}
            onClick={nextSlide}
          >
            <img
              src={config.images[(currentIndex + 1) % config.images.length].url}
              alt="Next"
              className="w-full h-full object-cover"
            />
          </motion.div>
        </div>

        {/* Navigation Arrows */}
        <motion.button
          className="absolute left-0 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white text-2xl"
          onClick={prevSlide}
          whileHover={{ scale: 1.1, backgroundColor: "rgba(255,255,255,0.3)" }}
          whileTap={{ scale: 0.9 }}
        >
          ←
        </motion.button>
        <motion.button
          className="absolute right-0 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white text-2xl"
          onClick={nextSlide}
          whileHover={{ scale: 1.1, backgroundColor: "rgba(255,255,255,0.3)" }}
          whileTap={{ scale: 0.9 }}
        >
          →
        </motion.button>
      </div>

      {/* Dot Navigation */}
      <div className="flex gap-3 mt-8 relative z-10">
        {config.images.map((_, index) => (
          <motion.button
            key={index}
            className={`w-3 h-3 rounded-full transition-colors ${
              index === currentIndex ? 'bg-pink-400' : 'bg-white/30'
            }`}
            onClick={() => goToSlide(index)}
            whileHover={{ scale: 1.3 }}
            animate={index === currentIndex ? { scale: [1, 1.3, 1] } : {}}
            transition={{ duration: 1, repeat: index === currentIndex ? Infinity : 0 }}
          />
        ))}
      </div>

      {/* Progress Bar */}
      <div className="w-64 h-1 bg-white/20 rounded-full mt-4 overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-pink-400 to-rose-400"
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 4, ease: "linear" }}
          key={currentIndex}
        />
      </div>

      {/* Message */}
      <motion.div
        className="mt-8 text-center max-w-md relative z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <p className="text-pink-200 italic text-lg">"{config.message}"</p>
        <p className="text-pink-300 mt-2 font-medium">— {config.signature}</p>
      </motion.div>
    </div>
  );
};

export default Gallery4;
