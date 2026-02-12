import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { templateConfig } from "../config/templateConfig";

const Postcard5 = () => {
  const [started, setStarted] = useState(false);
  const [currentMessage, setCurrentMessage] = useState(0);
  const [showFinal, setShowFinal] = useState(false);
  const config = templateConfig.postcard5;

  // Floating bubbles (reduced for performance)
  const bubbles = useMemo(
    () =>
      Array.from({ length: 15 }, (_, i) => ({
        id: i,
        left: (i * 6.67) % 100,
        size: 10 + ((i * 3) % 30),
        delay: (i * 0.33) % 5,
        duration: 8 + (i % 6),
      })),
    [],
  );

  const handleStart = () => {
    setStarted(true);
  };

  const nextMessage = () => {
    if (currentMessage < config.messages.length - 1) {
      setCurrentMessage((prev) => prev + 1);
    } else {
      setShowFinal(true);
    }
  };

  const restart = () => {
    setStarted(false);
    setCurrentMessage(0);
    setShowFinal(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-cyan-900 via-blue-800 to-indigo-900 flex flex-col items-center justify-center p-4 overflow-hidden relative">
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

      {/* Underwater Effect - Light Rays */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute top-0 w-32 h-full bg-gradient-to-b from-cyan-300/10 to-transparent"
            style={{ left: `${i * 25}%`, transform: "skewX(-15deg)" }}
            animate={{ opacity: [0.1, 0.3, 0.1] }}
            transition={{ duration: 4, delay: i * 0.5, repeat: Infinity }}
          />
        ))}
      </div>

      {/* Floating Bubbles */}
      {bubbles.map((bubble) => (
        <motion.div
          key={bubble.id}
          className="absolute rounded-full pointer-events-none"
          style={{
            left: `${bubble.left}%`,
            bottom: -50,
            width: bubble.size,
            height: bubble.size,
            background:
              "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.4), rgba(255,255,255,0.1))",
            border: "1px solid rgba(255,255,255,0.3)",
          }}
          animate={{
            y: [0, -window.innerHeight - 100],
            x: [0, Math.sin(bubble.id) * 30, 0],
          }}
          transition={{
            duration: bubble.duration,
            delay: bubble.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}

      <AnimatePresence mode="wait">
        {!started ? (
          // Opening Screen - Message Bottle
          <motion.div
            key="start"
            className="text-center"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8 }}
          >
            <motion.div
              className="text-8xl mb-6"
              animate={{
                y: [0, -15, 0],
                rotate: [0, 5, -5, 0],
              }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              🍾
            </motion.div>
            <h1 className="text-3xl md:text-4xl font-bold text-cyan-100 mb-4">
              {config.title}
            </h1>
            <p className="text-cyan-200/80 mb-8 max-w-md">{config.subtitle}</p>
            <motion.button
              onClick={handleStart}
              className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-full text-lg font-medium shadow-xl"
              whileHover={{
                scale: 1.05,
                boxShadow: "0 20px 40px rgba(6, 182, 212, 0.4)",
              }}
              whileTap={{ scale: 0.95 }}
            >
              Open the Bottle 💌
            </motion.button>
          </motion.div>
        ) : !showFinal ? (
          // Message Cards
          <motion.div
            key={`message-${currentMessage}`}
            className="w-[90vw] max-w-lg"
            initial={{ opacity: 0, y: 100, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -100, scale: 0.8 }}
            transition={{ type: "spring", damping: 20 }}
          >
            {/* Message Bottle Card */}
            <div className="bg-gradient-to-br from-amber-100 to-amber-50 rounded-2xl shadow-2xl overflow-hidden relative">
              {/* Aged Paper Texture */}
              <div className="absolute inset-0 opacity-20 bg-[url('data:image/svg+xml,...')]" />

              {/* Image */}
              <div className="h-48 md:h-64 overflow-hidden relative">
                <motion.img
                  src={config.messages[currentMessage].image}
                  alt={`Memory ${currentMessage + 1}`}
                  className="w-full h-full object-cover"
                  initial={{ scale: 1.2 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.8 }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-amber-100 to-transparent" />
              </div>

              {/* Message Content */}
              <div className="p-6 md:p-8 relative">
                <motion.div
                  className="text-4xl mb-4 text-center"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  {config.messages[currentMessage].emoji}
                </motion.div>

                <motion.p
                  className="text-gray-700 text-lg md:text-xl text-center font-serif leading-relaxed"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  "{config.messages[currentMessage].text}"
                </motion.p>

                {/* Wave Decoration */}
                <div className="mt-6 flex justify-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="w-2 h-2 bg-cyan-400 rounded-full"
                      animate={{ y: [0, -8, 0] }}
                      transition={{
                        duration: 1,
                        delay: i * 0.1,
                        repeat: Infinity,
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Progress & Navigation */}
            <div className="mt-6 flex flex-col items-center gap-4">
              {/* Progress Bubbles */}
              <div className="flex gap-2">
                {config.messages.map((_, index) => (
                  <motion.div
                    key={index}
                    className={`w-3 h-3 rounded-full ${
                      index <= currentMessage ? "bg-cyan-400" : "bg-white/30"
                    }`}
                    animate={
                      index === currentMessage ? { scale: [1, 1.3, 1] } : {}
                    }
                    transition={{ duration: 1, repeat: Infinity }}
                  />
                ))}
              </div>

              {/* Next Button */}
              <motion.button
                onClick={nextMessage}
                className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-full font-medium shadow-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {currentMessage < config.messages.length - 1
                  ? "Next Message 💫"
                  : "Read Final Note 💝"}
              </motion.button>
            </div>
          </motion.div>
        ) : (
          // Final Message
          <motion.div
            key="final"
            className="text-center max-w-2xl"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", damping: 15 }}
          >
            <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 md:p-12 shadow-2xl border border-white/20">
              {/* Final Image */}
              <motion.div
                className="w-40 h-40 mx-auto rounded-full overflow-hidden border-4 border-cyan-400/50 shadow-xl mb-6"
                animate={{
                  boxShadow: [
                    "0 0 30px rgba(6,182,212,0.3)",
                    "0 0 60px rgba(6,182,212,0.5)",
                    "0 0 30px rgba(6,182,212,0.3)",
                  ],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <img
                  src={config.finalImage}
                  alt="Final"
                  className="w-full h-full object-cover"
                />
              </motion.div>

              <motion.div
                className="text-5xl mb-4"
                animate={{
                  scale: [1, 1.3, 1],
                  rotate: [0, 10, -10, 0],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                💖
              </motion.div>

              <h2 className="text-2xl md:text-3xl font-bold text-cyan-100 mb-4">
                {config.finalTitle}
              </h2>

              <p className="text-cyan-200 text-lg leading-relaxed mb-6">
                {config.finalMessage}
              </p>

              <p className="text-cyan-300 font-medium text-xl italic">
                — {config.signature}
              </p>

              <motion.button
                onClick={restart}
                className="mt-8 px-6 py-3 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-full font-medium shadow-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Read Again 🍾
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Postcard5;
