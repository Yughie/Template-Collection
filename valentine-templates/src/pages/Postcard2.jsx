import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { templateConfig } from '../config/templateConfig';

const Postcard2 = () => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const config = templateConfig.postcard2;

  useEffect(() => {
    const timer = setTimeout(() => setShowContent(true), 500);
    return () => clearTimeout(timer);
  }, []);

  // Rose petals falling
  const roses = useMemo(() => Array.from({ length: 20 }, (_, i) => ({
    id: i,
    left: (i * 5) % 100,
    delay: (i * 0.25) % 5,
    duration: 10 + (i % 8),
    rotation: (i * 18) % 360
  })), []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-100 via-rose-100 to-pink-200 flex flex-col items-center justify-center p-4 overflow-hidden relative">
      {/* Back Button */}
      <Link to="/" className="absolute top-6 left-6 z-50">
        <motion.button
          className="px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full text-amber-700 font-medium shadow-lg hover:bg-white transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          ← Back
        </motion.button>
      </Link>

      {/* Falling Rose Animation */}
      {roses.map((rose) => (
        <motion.div
          key={rose.id}
          className="absolute pointer-events-none text-2xl"
          style={{ left: `${rose.left}%`, top: -50 }}
          animate={{
            y: [0, window.innerHeight + 100],
            rotate: [rose.rotation, rose.rotation + 720],
            x: [0, Math.sin(rose.id) * 80, 0]
          }}
          transition={{
            duration: rose.duration,
            delay: rose.delay,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          🌹
        </motion.div>
      ))}

      {/* Decorative Vintage Frame */}
      <motion.div
        className="absolute inset-10 border-4 border-amber-300/30 rounded-3xl pointer-events-none"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5 }}
      />
      <motion.div
        className="absolute inset-16 border-2 border-rose-300/30 rounded-2xl pointer-events-none"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, delay: 0.3 }}
      />

      {/* Main Content */}
      <AnimatePresence>
        {showContent && (
          <motion.div
            className="relative perspective-1000 cursor-pointer"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            onClick={() => setIsFlipped(!isFlipped)}
          >
            <motion.div
              className="relative preserve-3d w-[85vw] max-w-lg"
              animate={{ rotateY: isFlipped ? 180 : 0 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              style={{ transformStyle: 'preserve-3d' }}
            >
              {/* Front of Postcard */}
              <motion.div
                className="w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl backface-hidden relative"
                style={{ backfaceVisibility: 'hidden' }}
              >
                {/* Background Image */}
                <div 
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ 
                    backgroundImage: `url(${config.backgroundImage})`,
                    filter: 'sepia(30%) brightness(0.9)'
                  }}
                />
                
                {/* Vintage Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-amber-900/60 via-transparent to-amber-900/20" />
                
                {/* Vintage Border */}
                <div className="absolute inset-3 border-2 border-amber-200/50 rounded-xl" />
                
                {/* Content */}
                <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    <h1 className="text-3xl md:text-4xl font-serif text-amber-100 drop-shadow-lg mb-4">
                      {config.recipientName}
                    </h1>
                    <motion.div
                      className="text-5xl my-4"
                      animate={{ 
                        scale: [1, 1.2, 1],
                        rotate: [0, 10, -10, 0]
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      🌹
                    </motion.div>
                    <p className="text-amber-200 font-serif italic text-lg">
                      "{config.quote}"
                    </p>
                  </motion.div>
                </div>

                {/* Sparkles */}
                {[...Array(8)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-1 h-1 bg-amber-200 rounded-full"
                    style={{
                      top: `${10 + (i * 10) % 80}%`,
                      left: `${10 + (i * 10) % 80}%`
                    }}
                    animate={{
                      opacity: [0, 1, 0],
                      scale: [0, 2, 0]
                    }}
                    transition={{
                      duration: 2,
                      delay: i * 0.3,
                      repeat: Infinity
                    }}
                  />
                ))}
              </motion.div>

              {/* Back of Postcard */}
              <motion.div
                className="absolute inset-0 w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl"
                style={{ 
                  backfaceVisibility: 'hidden',
                  transform: 'rotateY(180deg)'
                }}
              >
                {/* Vintage Paper Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-amber-50 via-rose-50 to-amber-100" />
                
                {/* Paper Texture */}
                <div 
                  className="absolute inset-0 opacity-30"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
                  }}
                />

                {/* Vintage Border */}
                <div className="absolute inset-3 border-2 border-amber-400/50 rounded-xl" />
                
                {/* Postcard Lines */}
                <div className="absolute inset-0 p-8">
                  {/* Stamp Area */}
                  <div className="absolute top-4 right-4 w-16 h-20 border-2 border-dashed border-amber-400/50 rounded flex items-center justify-center">
                    <motion.span 
                      className="text-3xl"
                      animate={{ rotate: [0, 5, -5, 0] }}
                      transition={{ duration: 3, repeat: Infinity }}
                    >
                      💝
                    </motion.span>
                  </div>

                  {/* Message */}
                  <div className="mt-8 pr-20">
                    <motion.p 
                      className="text-amber-800 font-serif leading-relaxed text-sm md:text-base"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.3 }}
                    >
                      {config.message}
                    </motion.p>
                    
                    <motion.div 
                      className="mt-6"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.6 }}
                    >
                      <p className="font-serif italic text-amber-700">{config.signature}</p>
                      <p className="text-amber-600 mt-1">{config.senderName}</p>
                    </motion.div>
                  </div>

                  {/* Decorative Elements */}
                  <div className="absolute bottom-6 left-6 text-4xl opacity-50">🌹</div>
                  <div className="absolute bottom-6 right-6 text-2xl opacity-40">💕</div>
                </div>
              </motion.div>
            </motion.div>

            {/* Click hint */}
            <motion.p
              className="text-center mt-6 text-amber-700 font-serif italic"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              {isFlipped ? "Click to see the front" : "Click to read the message"} 💌
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Decorative Elements */}
      <motion.div
        className="absolute bottom-10 left-10 text-6xl opacity-30"
        animate={{ 
          rotate: [0, 10, -10, 0],
          scale: [1, 1.1, 1]
        }}
        transition={{ duration: 4, repeat: Infinity }}
      >
        🌹
      </motion.div>
      <motion.div
        className="absolute top-20 right-10 text-4xl opacity-30"
        animate={{ 
          rotate: [0, -10, 10, 0],
          scale: [1, 1.1, 1]
        }}
        transition={{ duration: 5, repeat: Infinity }}
      >
        🕊️
      </motion.div>
    </div>
  );
};

export default Postcard2;
