import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { getSentimentEmoji } from "../../utils/reviewStats";

const GameCard = ({ game, stats, index = 0, onClick }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.35, delay: index * 0.04 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onClick}
      className="rounded-xl overflow-hidden cursor-pointer
        bg-white/[0.02] border border-white/[0.05]
        transition-all duration-200
        hover:border-purple-500/30 hover:shadow-[0_12px_40px_rgba(168,85,247,0.15)]"
    >
      {/* Image */}
      <div className="relative h-[160px] sm:h-[200px] md:h-[220px] lg:h-[280px] overflow-hidden">
        <motion.img
          src={game.image}
          alt={game.title}
          loading="lazy"
          animate={{ scale: hovered ? 1.08 : 1 }}
          transition={{ duration: 0.3 }}
          className="w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

        {/* Hover overlay */}
        <AnimatePresence>
          {hovered && stats && stats.total > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="absolute inset-0 bg-black/75 backdrop-blur-sm
                flex flex-col items-center justify-center gap-1.5 sm:gap-2 md:gap-3 p-3 sm:p-4"
            >
              {/* Label sentiment — Stay Pixel */}
              <span
                style={{
                  color: stats.color,
                  fontFamily: "var(--stay-pixel)",
                  letterSpacing: "0.35em",
                }}
                className="text-[10px] sm:text-xs md:text-lg uppercase"
              >
                {stats.label}
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default GameCard;