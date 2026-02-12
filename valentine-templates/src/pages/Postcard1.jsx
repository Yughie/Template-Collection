import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { templateConfig } from '../config/templateConfig';

const Postcard1 = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showLetter, setShowLetter] = useState(false);
  const config = templateConfig.postcard1;

  const handleEnvelopeClick = () => {
    if (!isOpen) {
      setIsOpen(true);
      setTimeout(() => setShowLetter(true), 800);
    }
  };

  // Floating petals
  const petals = useMemo(() => Array.from({ length: 15 }, (_, i) => ({
    id: i,
    left: (i * 7) % 100,
    delay: (i * 0.2) % 3,
    duration: 8 + (i % 6),
    size: 15 + (i % 15),
    rotation: (i * 24) % 360
  })), []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-200 via-pink-100 to-rose-300 flex flex-col items-center justify-center p-4 overflow-hidden relative">
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

      {/* Floating Rose Petals */}
      {petals.map((petal) => (
        <motion.div
          key={petal.id}
          className="absolute pointer-events-none"
          style={{ 
            left: `${petal.left}%`,
            top: -50,
            fontSize: petal.size
          }}
          animate={{
            y: [0, window.innerHeight + 100],
            x: [0, Math.sin(petal.id) * 100, 0],
            rotate: [petal.rotation, petal.rotation + 360]
          }}
          transition={{
            duration: petal.duration,
            delay: petal.delay,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          🌸
        </motion.div>
      ))}

      {/* Envelope Container */}
      <div className="relative perspective-1000">
        <AnimatePresence>
          {!showLetter && (
            <motion.div
              className="relative cursor-pointer"
              onClick={handleEnvelopeClick}
              exit={{ opacity: 0, scale: 0.8, y: -100 }}
              transition={{ duration: 0.5 }}
            >
              {/* Envelope Body */}
              <motion.div
                className="w-80 md:w-96 h-56 md:h-64 bg-gradient-to-br from-rose-400 to-pink-500 rounded-lg shadow-2xl relative overflow-hidden"
                animate={!isOpen ? { 
                  boxShadow: [
                    "0 10px 40px rgba(244, 63, 94, 0.3)",
                    "0 20px 60px rgba(244, 63, 94, 0.5)",
                    "0 10px 40px rgba(244, 63, 94, 0.3)"
                  ]
                } : {}}
                transition={{ duration: 2, repeat: Infinity }}
              >
                {/* Envelope Pattern */}
                <div className="absolute inset-0 opacity-10">
                  <svg className="w-full h-full" viewBox="0 0 100 100">
                    <pattern id="hearts" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                      <text x="5" y="15" fontSize="10">💕</text>
                    </pattern>
                    <rect fill="url(#hearts)" width="100" height="100"/>
                  </svg>
                </div>

                {/* Envelope Flap (Top Triangle) */}
                <motion.div
                  className="absolute -top-1 left-0 right-0 h-32 origin-top"
                  style={{ transformStyle: 'preserve-3d' }}
                  animate={isOpen ? { rotateX: 180 } : { rotateX: 0 }}
                  transition={{ duration: 0.8, ease: "easeInOut" }}
                >
                  <div 
                    className="absolute inset-0 bg-gradient-to-br from-rose-500 to-pink-600"
                    style={{ 
                      clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
                      backfaceVisibility: 'hidden'
                    }}
                  >
                    {/* Heart Seal */}
                    <motion.div
                      className="absolute top-8 left-1/2 -translate-x-1/2"
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center shadow-lg">
                        <span className="text-2xl">❤️</span>
                      </div>
                    </motion.div>
                  </div>
                  {/* Inside of flap */}
                  <div 
                    className="absolute inset-0 bg-pink-200"
                    style={{ 
                      clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
                      transform: 'rotateX(180deg)',
                      backfaceVisibility: 'hidden'
                    }}
                  />
                </motion.div>

                {/* Bottom part of envelope */}
                <div 
                  className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-rose-600 to-rose-500"
                  style={{ clipPath: 'polygon(0 100%, 50% 30%, 100% 100%)' }}
                />
              </motion.div>

              {/* Click hint */}
              {!isOpen && (
                <motion.p
                  className="text-center mt-6 text-pink-700 font-medium"
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  Click to open your letter 💌
                </motion.p>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Letter Content */}
        <AnimatePresence>
          {showLetter && (
            <motion.div
              className="w-[90vw] max-w-2xl"
              initial={{ opacity: 0, y: 50, scale: 0.8, rotateX: -20 }}
              animate={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              {/* Paper */}
              <motion.div
                className="bg-gradient-to-br from-pink-50 via-rose-50 to-pink-100 rounded-lg shadow-2xl p-8 md:p-12 relative overflow-hidden"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23fda4af' fill-opacity='0.08'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
                }}
              >
                {/* Decorative Corner Hearts */}
                <div className="absolute top-4 left-4 text-2xl opacity-30">❤️</div>
                <div className="absolute top-4 right-4 text-2xl opacity-30">❤️</div>
                <div className="absolute bottom-4 left-4 text-2xl opacity-30">❤️</div>
                <div className="absolute bottom-4 right-4 text-2xl opacity-30">❤️</div>

                {/* Date */}
                <motion.p 
                  className="text-right text-pink-400 italic mb-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  {config.date}
                </motion.p>

                {/* Recipient */}
                <motion.h2
                  className="text-2xl md:text-3xl font-serif text-rose-600 mb-8"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  {config.recipientName},
                </motion.h2>

                {/* Message with line-by-line animation */}
                <motion.div className="space-y-4 text-gray-700 leading-relaxed font-serif text-lg">
                  {config.message.split('\n\n').map((paragraph, index) => (
                    <motion.p
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 + index * 0.3 }}
                    >
                      {paragraph}
                    </motion.p>
                  ))}
                </motion.div>

                {/* Signature */}
                <motion.div
                  className="mt-10 text-right"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.5 }}
                >
                  <p className="text-rose-500 font-serif text-xl italic">{config.signature}</p>
                  <p className="text-rose-400 mt-2 font-medium">{config.senderName}</p>
                </motion.div>

                {/* Animated hearts floating up */}
                {[...Array(8)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute text-xl pointer-events-none"
                    style={{
                      bottom: 20,
                      left: `${10 + i * 12}%`
                    }}
                    animate={{
                      y: [-10, -100],
                      opacity: [0, 1, 0],
                      scale: [0.5, 1, 0.5]
                    }}
                    transition={{
                      duration: 3,
                      delay: 2 + i * 0.3,
                      repeat: Infinity,
                      repeatDelay: 2
                    }}
                  >
                    {['❤️', '💕', '💗', '💖'][i % 4]}
                  </motion.div>
                ))}
              </motion.div>

              {/* Reset button */}
              <motion.div
                className="text-center mt-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2 }}
              >
                <motion.button
                  onClick={() => { setShowLetter(false); setIsOpen(false); }}
                  className="px-6 py-3 bg-gradient-to-r from-rose-400 to-pink-500 text-white rounded-full font-medium shadow-lg"
                  whileHover={{ scale: 1.05, boxShadow: "0 10px 30px rgba(244, 63, 94, 0.4)" }}
                  whileTap={{ scale: 0.95 }}
                >
                  Close Letter 💌
                </motion.button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Postcard1;
