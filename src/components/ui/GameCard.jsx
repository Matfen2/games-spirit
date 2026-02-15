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
      <div className="relative h-[160px] sm:h-[200px] md:h-[220px] lg:h-[240px] overflow-hidden">
        <motion.img
          src={game.image}
          alt={game.title}
          loading="lazy"
          animate={{ scale: hovered ? 1.08 : 1 }}
          transition={{ duration: 0.3 }}
          className="w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

        {/* Hover overlay : critique Steam */}
        <AnimatePresence>
          {hovered && stats && stats.total > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="absolute inset-0 bg-black/75 backdrop-blur-sm
                flex flex-col items-center justify-center gap-2 sm:gap-3 p-3 sm:p-4"
            >
              <span className="text-2xl sm:text-3xl">
                {getSentimentEmoji(stats.pct)}
              </span>
              <span
                className="text-xs sm:text-sm font-extrabold font-heading uppercase tracking-wide"
                style={{ color: stats.color }}
              >
                {stats.label}
              </span>

              {/* Barre sentiment */}
              <div className="w-full max-w-[120px] sm:max-w-[140px] h-1.5 sm:h-2 rounded-full bg-white/10 overflow-hidden flex">
                <div
                  className="h-full rounded-full bg-green-500"
                  style={{ width: `${stats.pct}%` }}
                />
                <div
                  className="h-full rounded-full bg-red-500"
                  style={{ width: `${100 - stats.pct}%` }}
                />
              </div>

              {/* Stats */}
              <div className="flex items-center gap-2 sm:gap-3">
                <span className="text-[9px] sm:text-[10px] font-mono text-green-400/80">
                  👍 {stats.pos}
                </span>
                <span className="text-[9px] sm:text-[10px] font-mono text-red-400/80">
                  👎 {stats.neg}
                </span>
              </div>

              <span className="text-[9px] sm:text-[10px] text-gray-400 font-mono">
                {stats.total} avis · {stats.pct}% positifs
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Titre + Prix */}
      <div className="p-2 sm:p-3 flex items-center justify-between gap-1.5 sm:gap-2">
        <h3 className="text-xs sm:text-sm font-extrabold text-gray-200 font-heading uppercase tracking-wide truncate">
          {game.title}
        </h3>
        <span className="text-xs sm:text-sm font-bold font-mono text-purple-300 whitespace-nowrap">
          {game.price.toFixed(2)} €
        </span>
      </div>
    </motion.div>
  );
};

export default GameCard;