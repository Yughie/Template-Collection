import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { templateConfig } from '../config/templateConfig';

const Postcard3 = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showFinal, setShowFinal] = useState(false);
  const config = templateConfig.postcard3;

  const colors = [
    'from-pink-400 to-rose-400',
    'from-purple-400 to-pink-400',
    'from-rose-400 to-red-400',
    'from-fuchsia-400 to-pink-400',
    'from-pink-400 to-purple-400',
    'from-red-400 to-pink-400',
  ];

  useEffect(() => {
    if (currentIndex < config.messages.length) {
      const timer = setTimeout(() => {
        setCurrentIndex(prev => prev + 1);
      }, 2500);
      return () => clearTimeout(timer);
    } else if (!showFinal) {
      setTimeout(() => setShowFinal(true), 500);
    }
  }, [currentIndex, config.messages.length, showFinal]);

  // Confetti hearts
  const confetti = useMemo(() => Array.from({ length: 30 }, (_, i) => ({
    id: i,
    left: (i * 3.33) % 100,
    delay: (i * 0.07) % 2,
    duration: 4 + (i % 4),
    emoji: ['💕', '💗', '💖', '💝', '🩷', '✨', '⭐', '💫'][i % 8],
    size: 15 + (i % 20)
  })), []);

  const bubbles = useMemo(() => Array.from({ length: 15 }, (_, i) => ({
    id: i,
    left: (i * 6.67) % 100,
    size: 20 + (i * 4) % 60,
    delay: (i * 0.2) % 3,
    duration: 8 + (i % 6)
  })), []);

  const restart = () => {
    setCurrentIndex(0);
    setShowFinal(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-200 via-purple-100 to-pink-300 flex flex-col items-center justify-center p-4 overflow-hidden relative">
      {/* Back Button */}
      <Link to="/" className="absolute top-6 left-6 z-50">
        <motion.button
          className="px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full text-pink-600 font-medium shadow-lg hover:bg-white transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          ← Back
        </motion.button>
      </Link>

      {/* Floating Confetti */}
      {confetti.map((item) => (
        <motion.div
          key={item.id}
          className="absolute pointer-events-none"
          style={{ 
            left: `${item.left}%`, 
            top: -50,
            fontSize: item.size
          }}
          animate={{
            y: [0, window.innerHeight + 100],
            rotate: [0, 360],
            x: [0, Math.sin(item.id) * 50, 0]
          }}
          transition={{
            duration: item.duration,
            delay: item.delay,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          {item.emoji}
        </motion.div>
      ))}

      {/* Floating Bubbles */}
      {bubbles.map((bubble) => (
        <motion.div
          key={`bubble-${bubble.id}`}
          className="absolute rounded-full pointer-events-none"
          style={{
            left: `${bubble.left}%`,
            bottom: -100,
            width: bubble.size,
            height: bubble.size,
            background: 'linear-gradient(135deg, rgba(255,182,193,0.4), rgba(255,105,180,0.2))',
            border: '1px solid rgba(255,255,255,0.5)'
          }}
          animate={{
            y: [0, -window.innerHeight - 200],
            x: [0, Math.sin(bubble.id) * 30, 0],
            scale: [1, 1.2, 1]
          }}
          transition={{
            duration: bubble.duration,
            delay: bubble.delay,
            repeat: Infinity,
            ease: "easeOut"
          }}
        />
      ))}

      {/* Title */}
      <motion.div
        className="text-center mb-8 relative z-10"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <motion.h1
          className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-pink-500 bg-clip-text text-transparent"
          animate={{ 
            backgroundPosition: ['0%', '100%', '0%']
          }}
          transition={{ duration: 3, repeat: Infinity }}
          style={{ backgroundSize: '200%' }}
        >
          {config.recipientName}
        </motion.h1>
        <motion.p
          className="text-pink-600 mt-2 font-medium"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          From: {config.senderName}
        </motion.p>
      </motion.div>

      {/* Message Cards Container */}
      <div className="relative w-[90vw] max-w-md h-64 flex items-center justify-center">
        <AnimatePresence mode="wait">
          {!showFinal ? (
            config.messages.map((message, index) => (
              index === currentIndex && (
                <motion.div
                  key={index}
                  className={`absolute w-full bg-gradient-to-br ${colors[index]} rounded-3xl p-8 shadow-2xl`}
                  initial={{ 
                    opacity: 0, 
                    scale: 0.3,
                    rotate: -180,
                    y: 100
                  }}
                  animate={{ 
                    opacity: 1, 
                    scale: 1,
                    rotate: 0,
                    y: 0
                  }}
                  exit={{ 
                    opacity: 0, 
                    scale: 0.3,
                    rotate: 180,
                    y: -100
                  }}
                  transition={{ 
                    type: "spring",
                    stiffness: 200,
                    damping: 20
                  }}
                >
                  {/* Glitter effect */}
                  {[...Array(10)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-2 h-2 bg-white rounded-full"
                      style={{
                        top: `${Math.random() * 100}%`,
                        left: `${Math.random() * 100}%`
                      }}
                      animate={{
                        opacity: [0, 1, 0],
                        scale: [0, 1.5, 0]
                      }}
                      transition={{
                        duration: 1.5,
                        delay: i * 0.2,
                        repeat: Infinity
                      }}
                    />
                  ))}
                  
                  <motion.p 
                    className="text-2xl md:text-3xl text-white text-center font-bold drop-shadow-lg"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    {message}
                  </motion.p>
                </motion.div>
              )
            ))
          ) : (
            <motion.div
              className="absolute w-full bg-gradient-to-br from-pink-400 via-rose-400 to-pink-500 rounded-3xl p-8 shadow-2xl"
              initial={{ opacity: 0, scale: 0, rotate: 360 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ 
                type: "spring",
                stiffness: 150,
                damping: 15
              }}
            >
              {/* Rainbow border animation */}
              <motion.div
                className="absolute inset-0 rounded-3xl opacity-50"
                style={{
                  background: 'linear-gradient(90deg, #ff69b4, #ff1493, #c71585, #db7093, #ff69b4)',
                  backgroundSize: '300% 100%',
                  padding: 3
                }}
                animate={{
                  backgroundPosition: ['0%', '100%', '0%']
                }}
                transition={{ duration: 3, repeat: Infinity }}
              />
              
              {/* Big hearts animation */}
              <motion.div
                className="text-6xl text-center mb-4"
                animate={{ 
                  scale: [1, 1.3, 1],
                  rotate: [0, 10, -10, 0]
                }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                💖
              </motion.div>
              
              <motion.p 
                className="text-xl md:text-2xl text-white text-center font-bold drop-shadow-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                {config.finalMessage}
              </motion.p>
              
              <motion.p
                className="text-white/90 text-center mt-4 font-medium text-lg"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                {config.signature}
              </motion.p>

              {/* Floating hearts around final card */}
              {[...Array(12)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute text-2xl pointer-events-none"
                  style={{
                    top: '50%',
                    left: '50%'
                  }}
                  animate={{
                    x: Math.cos(i * 30 * Math.PI / 180) * 150,
                    y: Math.sin(i * 30 * Math.PI / 180) * 120,
                    opacity: [0, 1, 0],
                    scale: [0.5, 1.5, 0.5]
                  }}
                  transition={{
                    duration: 2,
                    delay: i * 0.1,
                    repeat: Infinity,
                    repeatDelay: 1
                  }}
                >
                  {['💕', '💗', '💖', '💝'][i % 4]}
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Progress dots */}
      <div className="flex gap-2 mt-8 relative z-10">
        {config.messages.map((_, index) => (
          <motion.div
            key={index}
            className={`w-3 h-3 rounded-full ${
              index < currentIndex 
                ? 'bg-pink-500' 
                : index === currentIndex 
                  ? 'bg-pink-400' 
                  : 'bg-pink-200'
            }`}
            animate={index === currentIndex ? {
              scale: [1, 1.5, 1]
            } : {}}
            transition={{ duration: 0.5, repeat: Infinity }}
          />
        ))}
        <motion.div
          className={`w-3 h-3 rounded-full ${showFinal ? 'bg-pink-500' : 'bg-pink-200'}`}
          animate={showFinal ? { scale: [1, 1.5, 1] } : {}}
          transition={{ duration: 0.5, repeat: Infinity }}
        />
      </div>

      {/* Replay button */}
      {showFinal && (
        <motion.button
          onClick={restart}
          className="mt-8 px-8 py-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-full font-bold shadow-lg relative z-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{ scale: 1.1, boxShadow: "0 10px 30px rgba(236, 72, 153, 0.5)" }}
          whileTap={{ scale: 0.95 }}
        >
          Play Again 🔄
        </motion.button>
      )}
    </div>
  );
};

export default Postcard3;
