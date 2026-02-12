import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import games from "../data/games.json";
import Description from "../components/ui/Description";

const GameCard = ({ game, onClick, index }) => (
  <motion.div
    onClick={() => onClick(game)}
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.4, delay: index * 0.05 }}
    whileHover={{
      scale: 1.06,
      boxShadow: "0 12px 40px rgba(168,85,247,0.35)",
    }}
    className="w-[420px] min-w-[280px] h-[210px] rounded-xl overflow-hidden
      cursor-pointer relative flex-shrink-0"
  >
    <img
      src={game.image}
      alt={game.title}
      className="w-full h-full object-cover"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
  </motion.div>
);

const Home = () => {
  const navigate = useNavigate();

  const handleGameClick = (game) => {
    navigate(`/game/${game.slug}`);
  };

  const row1 = games.slice(0, 6);
  const row2 = games.slice(6, 12);

  // Duplication pour l'effet boucle infinie
  const row1Dup = [...row1, ...row1];
  const row2Dup = [...row2, ...row2];

  return (
    <section id="home" style={{
          background:
            "radial-gradient(circle, rgba(139,92,246,0.12) 0%, transparent 70%)",
        }}>
      <Description
        title="Explorez "
        subtitle="l'univers gaming"
        sentence="Parcourez les meilleurs jeux par plateforme et genre. Lisez les avis de la communauté."
      />

      {/* ── Carrousels auto-scroll ── */}
      <div className="flex flex-col gap-6 py-8">

        {/* Ligne 1 → défile vers la gauche */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="overflow-hidden relative group"
        >
          <div className="absolute left-0 top-0 bottom-0 w-20 z-10 pointer-events-none bg-gradient-to-r from-[#0a0914] to-transparent" />
          <div className="absolute right-0 top-0 bottom-0 w-20 z-10 pointer-events-none bg-gradient-to-l from-[#0a0914] to-transparent" />

          <div
            className="flex gap-5 w-max group-hover:[animation-play-state:paused]"
            style={{ animation: "scroll-left 35s linear infinite" }}
          >
            {row1Dup.map((game, i) => (
              <GameCard
                key={`r1-${game.id}-${i}`}
                game={game}
                onClick={handleGameClick}
                index={i}
              />
            ))}
          </div>
        </motion.div>

        {/* Ligne 2 → défile vers la droite */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          className="overflow-hidden relative group"
        >
          <div className="absolute left-0 top-0 bottom-0 w-20 z-10 pointer-events-none bg-gradient-to-r from-[#0a0914] to-transparent" />
          <div className="absolute right-0 top-0 bottom-0 w-20 z-10 pointer-events-none bg-gradient-to-l from-[#0a0914] to-transparent" />

          <div
            className="flex gap-5 w-max group-hover:[animation-play-state:paused]"
            style={{ animation: "scroll-right 40s linear infinite" }}
          >
            {row2Dup.map((game, i) => (
              <GameCard
                key={`r2-${game.id}-${i}`}
                game={game}
                onClick={handleGameClick}
                index={i}
              />
            ))}
          </div>
        </motion.div>
      </div>

      {/* ── CTA ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="text-center pt-2.5 pb-14"
      >
        <motion.button
          onClick={() => navigate("/games")}
          whileHover={{
            scale: 1.05,
            boxShadow: "0 0 40px rgba(168,85,247,0.25)",
          }}
          style={{ fontFamily: "var(--stay-pixel)" }}
          whileTap={{ scale: 0.97 }}
          className="px-4 py-2 rounded-4xl cursor-pointer
            bg-purple-500/[0.08] text-purple-300
            font-extrabold text-base font-heading uppercase
            border border-purple-500/40 tracking-widest
            shadow-[0_0_30px_rgba(168,85,247,0.1)]
            hover:bg-purple-500/15 hover:border-purple-500/60
            transition-colors duration-300"
        >
          Voir les jeux
        </motion.button>
      </motion.div>
    </section>
  );
};

export default Home;