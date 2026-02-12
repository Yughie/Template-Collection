import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { templateConfig } from "../config/templateConfig";

const Postcard6 = () => {
  const [isShaken, setIsShaken] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [snowActive, setSnowActive] = useState(false);
  const config = templateConfig.postcard6;

  // Snowflakes (optimized count)
  const snowflakes = useMemo(
    () =>
      Array.from({ length: 30 }, (_, i) => ({
        id: i,
        left: (i * 3.33) % 100,
        delay: (i * 0.1) % 3,
        duration: 4 + (i % 4),
        size: 8 + (i % 12),
        opacity: 0.4 + (i % 6) * 0.1,
      })),
    [],
  );

  const handleShake = () => {
    if (!isShaken) {
      setIsShaken(true);
      setSnowActive(true);
      setTimeout(() => setShowMessage(true), 1500);
    }
  };

  const restart = () => {
    setIsShaken(false);
    setShowMessage(false);
    setSnowActive(false);
  };

  // Auto-restart snow after it settles
  useEffect(() => {
    if (snowActive) {
      const timer = setInterval(() => {
        setSnowActive(false);
        setTimeout(() => setSnowActive(true), 100);
      }, 8000);
      return () => clearInterval(timer);
    }
  }, [snowActive]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-purple-900 to-slate-900 flex flex-col items-center justify-center p-4 overflow-hidden relative">
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

      {/* Ambient Stars */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-white rounded-full"
          style={{
            left: `${(i * 5) % 100}%`,
            top: `${(i * 5) % 100}%`,
          }}
          animate={{
            opacity: [0.2, 0.8, 0.2],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: 2 + (i % 3),
            delay: (i * 0.2) % 2,
            repeat: Infinity,
          }}
        />
      ))}

      {/* Title */}
      <motion.h1
        className="text-3xl md:text-4xl font-bold text-white mb-8 text-center"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
      >
        {config.title}
      </motion.h1>

      {/* Snow Globe */}
      <motion.div
        className="relative cursor-pointer"
        onClick={handleShake}
        animate={
          isShaken
            ? {
                rotate: [0, -10, 10, -5, 5, 0],
                y: [0, -20, 0],
              }
            : {}
        }
        transition={{ duration: 0.8 }}
        whileHover={!isShaken ? { scale: 1.02 } : {}}
      >
        {/* Globe Container */}
        <div className="relative">
          {/* Glass Dome */}
          <div className="w-72 h-72 md:w-96 md:h-96 rounded-full bg-gradient-to-b from-white/20 to-white/5 backdrop-blur-sm border border-white/30 relative overflow-hidden shadow-2xl">
            {/* Inner Glow */}
            <div className="absolute inset-4 rounded-full bg-gradient-to-b from-cyan-900/50 to-purple-900/50">
              {/* Scene Inside Globe */}
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                {/* Couple/Image */}
                <motion.div
                  className="relative z-10"
                  animate={showMessage ? {} : { y: [0, -5, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-white/30 shadow-lg">
                    <img
                      src={config.image}
                      alt="Love"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </motion.div>

                {/* Hearts floating */}
                {showMessage &&
                  [...Array(6)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute text-xl"
                      initial={{
                        x: 0,
                        y: 0,
                        opacity: 0,
                      }}
                      animate={{
                        x: Math.cos((i * 60 * Math.PI) / 180) * 80,
                        y: Math.sin((i * 60 * Math.PI) / 180) * 80 - 20,
                        opacity: [0, 1, 0],
                        scale: [0.5, 1.2, 0.5],
                      }}
                      transition={{
                        duration: 3,
                        delay: i * 0.2,
                        repeat: Infinity,
                      }}
                    >
                      {["💕", "💖", "💗", "❤️", "💝", "🌹"][i]}
                    </motion.div>
                  ))}
              </div>

              {/* Snowflakes */}
              {snowActive &&
                snowflakes.map((flake) => (
                  <motion.div
                    key={flake.id}
                    className="absolute text-white pointer-events-none"
                    style={{
                      left: `${flake.left}%`,
                      top: -20,
                      fontSize: flake.size,
                      opacity: flake.opacity,
                    }}
                    animate={{
                      y: [0, 280],
                      x: [0, Math.sin(flake.id) * 20, 0],
                      rotate: [0, 360],
                    }}
                    transition={{
                      duration: flake.duration,
                      delay: flake.delay,
                      ease: "linear",
                    }}
                  >
                    ❄
                  </motion.div>
                ))}
            </div>

            {/* Glass Reflection */}
            <motion.div
              className="absolute top-4 left-8 w-16 h-32 bg-white/20 rounded-full blur-md transform rotate-[-30deg]"
              animate={{ opacity: [0.3, 0.5, 0.3] }}
              transition={{ duration: 3, repeat: Infinity }}
            />
          </div>

          {/* Globe Base */}
          <div className="w-40 h-16 md:w-52 md:h-20 mx-auto -mt-4 bg-gradient-to-b from-amber-700 to-amber-900 rounded-b-3xl relative shadow-xl">
            <div className="absolute inset-x-4 top-2 h-2 bg-amber-500/30 rounded-full" />
            <div className="absolute inset-x-8 bottom-3 text-center">
              <p className="text-amber-200/80 font-serif text-sm">
                {config.baseText}
              </p>
            </div>
          </div>
        </div>

        {/* Shake Hint */}
        {!isShaken && (
          <motion.p
            className="text-center mt-6 text-purple-200/80"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Click to shake the snow globe ❄️
          </motion.p>
        )}
      </motion.div>

      {/* Message */}
      <AnimatePresence>
        {showMessage && (
          <motion.div
            className="mt-8 max-w-md text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
              <motion.p
                className="text-white text-lg leading-relaxed"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                {config.message}
              </motion.p>

              <motion.p
                className="mt-4 text-pink-300 font-medium italic"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
              >
                — {config.signature}
              </motion.p>
            </div>

            <motion.button
              onClick={restart}
              className="mt-6 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full font-medium shadow-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 }}
            >
              Shake Again ❄️
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Postcard6;
