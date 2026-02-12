import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { templateConfig } from "../config/templateConfig";

const Gallery6 = () => {
  const [selectedStar, setSelectedStar] = useState(null);
  const [hoveredStar, setHoveredStar] = useState(null);
  const config = templateConfig.gallery6;

  // Star positions in a constellation pattern
  const starPositions = useMemo(
    () => [
      { x: 20, y: 25 },
      { x: 45, y: 15 },
      { x: 70, y: 30 },
      { x: 85, y: 20 },
      { x: 15, y: 55 },
      { x: 40, y: 50 },
      { x: 60, y: 60 },
      { x: 80, y: 55 },
      { x: 30, y: 80 },
      { x: 55, y: 75 },
      { x: 75, y: 85 },
      { x: 50, y: 45 },
    ],
    [],
  );

  // Constellation lines connecting stars
  const constellationLines = useMemo(
    () => [
      [0, 1],
      [1, 2],
      [2, 3],
      [0, 4],
      [4, 5],
      [5, 6],
      [6, 7],
      [4, 8],
      [8, 9],
      [9, 10],
      [5, 11],
      [11, 6],
      [1, 11],
    ],
    [],
  );

  // Background stars
  const backgroundStars = useMemo(
    () =>
      Array.from({ length: 50 }, (_, i) => ({
        id: i,
        left: (i * 2.04) % 100,
        top: (i * 2.04) % 100,
        size: 1 + (i % 3),
        delay: (i * 0.1) % 3,
        duration: 2 + (i % 3),
      })),
    [],
  );

  // Shooting stars
  const shootingStars = useMemo(
    () =>
      Array.from({ length: 3 }, (_, i) => ({
        id: i,
        startX: 10 + i * 30,
        startY: 5 + i * 10,
        delay: i * 8,
      })),
    [],
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-indigo-950 to-purple-950 overflow-hidden relative">
      {/* Back Button */}
      <Link to="/" className="fixed top-6 left-6 z-50">
        <motion.button
          className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white font-medium shadow-lg hover:bg-white/20 transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          ← Back
        </motion.button>
      </Link>

      {/* Background Stars */}
      {backgroundStars.map((star) => (
        <motion.div
          key={star.id}
          className="absolute bg-white rounded-full pointer-events-none"
          style={{
            left: `${star.left}%`,
            top: `${star.top}%`,
            width: star.size,
            height: star.size,
          }}
          animate={{
            opacity: [0.2, 0.8, 0.2],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: star.duration,
            delay: star.delay,
            repeat: Infinity,
          }}
        />
      ))}

      {/* Shooting Stars */}
      {shootingStars.map((star) => (
        <motion.div
          key={`shooting-${star.id}`}
          className="absolute w-1 h-1 bg-white rounded-full pointer-events-none"
          style={{
            left: `${star.startX}%`,
            top: `${star.startY}%`,
            boxShadow: "0 0 10px #fff, 0 0 20px #fff, 0 0 30px #fff",
          }}
          animate={{
            x: [0, 300],
            y: [0, 200],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 2,
            delay: star.delay,
            repeat: Infinity,
            repeatDelay: 12,
          }}
        />
      ))}

      {/* Header */}
      <motion.header
        className="text-center pt-16 pb-8 relative z-10"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <motion.div
          className="text-5xl mb-4"
          animate={{ rotate: [0, 5, -5, 0] }}
          transition={{ duration: 6, repeat: Infinity }}
        >
          ⭐
        </motion.div>
        <h1 className="text-4xl md:text-5xl font-bold text-white tracking-wider">
          {config.title}
        </h1>
        <p className="text-indigo-300 mt-2">{config.subtitle}</p>
        <p className="text-indigo-400/60 text-sm mt-4">
          Click on the stars to explore our memories
        </p>
      </motion.header>

      {/* Constellation Container */}
      <div className="relative w-full h-[60vh] md:h-[70vh]">
        {/* SVG for constellation lines */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          {constellationLines.map(([from, to], index) => {
            const fromPos = starPositions[from];
            const toPos = starPositions[to];
            if (!fromPos || !toPos) return null;

            return (
              <motion.line
                key={index}
                x1={`${fromPos.x}%`}
                y1={`${fromPos.y}%`}
                x2={`${toPos.x}%`}
                y2={`${toPos.y}%`}
                stroke="rgba(165, 180, 252, 0.3)"
                strokeWidth="1"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 2, delay: index * 0.1 }}
              />
            );
          })}
        </svg>

        {/* Star Points (Photos) */}
        {config.stars.slice(0, starPositions.length).map((star, index) => {
          const pos = starPositions[index];
          if (!pos) return null;

          return (
            <motion.div
              key={index}
              className="absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.5 + index * 0.1 }}
              onMouseEnter={() => setHoveredStar(index)}
              onMouseLeave={() => setHoveredStar(null)}
              onClick={() => setSelectedStar(star)}
            >
              {/* Glow Effect */}
              <motion.div
                className="absolute inset-0 rounded-full"
                style={{
                  background:
                    "radial-gradient(circle, rgba(165,180,252,0.5), transparent)",
                  transform: "scale(2)",
                }}
                animate={{
                  opacity:
                    hoveredStar === index ? [0.5, 0.8, 0.5] : [0.2, 0.4, 0.2],
                  scale: hoveredStar === index ? [2, 2.5, 2] : [1.5, 2, 1.5],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              />

              {/* Star/Photo */}
              <motion.div
                className="relative w-12 h-12 md:w-16 md:h-16 rounded-full overflow-hidden border-2 border-indigo-300/50"
                whileHover={{ scale: 1.3 }}
                animate={{
                  boxShadow:
                    hoveredStar === index
                      ? [
                          "0 0 20px rgba(165,180,252,0.8)",
                          "0 0 40px rgba(165,180,252,1)",
                          "0 0 20px rgba(165,180,252,0.8)",
                        ]
                      : [
                          "0 0 10px rgba(165,180,252,0.3)",
                          "0 0 20px rgba(165,180,252,0.5)",
                          "0 0 10px rgba(165,180,252,0.3)",
                        ],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <img
                  src={star.image}
                  alt={star.caption}
                  className="w-full h-full object-cover"
                />
              </motion.div>

              {/* Hover Label */}
              <AnimatePresence>
                {hoveredStar === index && (
                  <motion.div
                    className="absolute top-full mt-2 left-1/2 -translate-x-1/2 whitespace-nowrap bg-indigo-900/80 backdrop-blur-sm px-3 py-1 rounded-full text-sm text-indigo-100"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                  >
                    {star.caption}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>

      {/* Footer Message */}
      <motion.div
        className="text-center pb-12 relative z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
      >
        <p className="text-indigo-200 italic text-lg">"{config.message}"</p>
        <p className="text-indigo-300 mt-2">— {config.signature}</p>
      </motion.div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedStar && (
          <motion.div
            className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedStar(null)}
          >
            <motion.div
              className="relative max-w-2xl w-full"
              initial={{ scale: 0.5, opacity: 0, rotate: -10 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              exit={{ scale: 0.5, opacity: 0, rotate: 10 }}
              transition={{ type: "spring", damping: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Star Burst Effect */}
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-20 bg-gradient-to-t from-indigo-400/50 to-transparent top-1/2 left-1/2 origin-bottom pointer-events-none"
                  style={{ transform: `rotate(${i * 45}deg)` }}
                  animate={{
                    scaleY: [0, 1.5, 0],
                    opacity: [0, 0.5, 0],
                  }}
                  transition={{
                    duration: 2,
                    delay: i * 0.1,
                    repeat: Infinity,
                  }}
                />
              ))}

              {/* Image Card */}
              <div className="relative rounded-2xl overflow-hidden border-2 border-indigo-400/30 shadow-2xl">
                <img
                  src={selectedStar.image}
                  alt={selectedStar.caption}
                  className="w-full"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-indigo-950/80 to-transparent" />

                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-white text-2xl font-bold">
                    {selectedStar.caption}
                  </h3>
                  <p className="text-indigo-200 mt-1">{selectedStar.date}</p>
                  <p className="text-indigo-300 mt-4 italic">
                    {selectedStar.note}
                  </p>
                </div>
              </div>

              <motion.button
                className="absolute -top-4 -right-4 w-10 h-10 bg-indigo-500/50 rounded-full flex items-center justify-center text-white backdrop-blur-sm"
                whileHover={{
                  scale: 1.1,
                  backgroundColor: "rgba(99, 102, 241, 0.8)",
                }}
                onClick={() => setSelectedStar(null)}
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

export default Gallery6;
