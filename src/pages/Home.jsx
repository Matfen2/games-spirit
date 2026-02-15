import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import games from "../data/games.json";
import Description from "../components/ui/Description";

const CarouselCard = ({ game, onClick }) => (
  <div
    onClick={() => onClick(game)}
    className="sm:w-[45vw] md:w-[380px] lg:w-[420px]
      sm:min-w-[45vw] md:min-w-[380px] lg:min-w-[420px]
      sm:h-[27vw] md:h-[315px] lg:h-[320px] xl:h-[340px] 2xl:h-[310px]
      rounded-xl overflow-hidden
      cursor-pointer relative flex-shrink-0
      transition-transform duration-150 ease-out
      hover:scale-[1.06] hover:shadow-[0_12px_40px_rgba(168,85,247,0.35)]"
  >
    <img
      src={game.image}
      alt={game.title}
      loading="lazy"
      className="w-full h-full object-cover"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
  </div>
);

const MobileCard = ({ game, onClick }) => (
  <div
    onClick={() => onClick(game)}
    className="w-full aspect-[16/10] rounded-xl overflow-hidden
      cursor-pointer relative flex-shrink-0
      transition-transform duration-150
      active:scale-[0.97]"
  >
    <img
      src={game.image}
      alt={game.title}
      loading="lazy"
      className="w-full h-full object-cover"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
    <span className="absolute bottom-2 left-2.5 right-2.5 text-[10px] font-heading font-bold text-white uppercase tracking-wide truncate">
      {game.title}
    </span>
  </div>
);

const Home = () => {
  const navigate = useNavigate();

  const handleGameClick = (game) => {
    navigate(`/game/${game.slug}`);
  };

  const row1 = games.slice(0, 6);
  const row2 = games.slice(6, 12);

  const row1Dup = [...row1, ...row1];
  const row2Dup = [...row2, ...row2];

  // Mobile : 2 colonnes verticales
  const col1 = games.filter((_, i) => i % 2 === 0);
  const col2 = games.filter((_, i) => i % 2 !== 0);
  const col1Dup = [...col1, ...col1];
  const col2Dup = [...col2, ...col2];

  return (
    <section
      id="home"
      className="flex flex-col min-h-[calc(100vh-56px)]"
      style={{
        background:
          "radial-gradient(circle, rgba(139,92,246,0.12) 0%, transparent 70%)",
      }}
    >
      <Description
        title="Explorez "
        subtitle="l'univers gaming"
        sentence="Parcourez les meilleurs jeux par plateforme et genre. Lisez les avis de la communauté."
      />

      {/* ══ MOBILE : carrousel vertical auto-scroll 2 colonnes ══ */}
      <div className="sm:hidden flex-1 flex flex-col justify-center py-4 px-3">
        <div className="h-[66vh] overflow-hidden relative">
          <div className="absolute top-0 left-0 right-0 h-12 z-10 pointer-events-none bg-gradient-to-b from-[#0a0914] to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 h-12 z-10 pointer-events-none bg-gradient-to-t from-[#0a0914] to-transparent" />

          <div className="flex gap-3 h-full">
            {/* Colonne 1 — défile vers le haut */}
            <div className="flex-1 overflow-hidden relative">
              <div className="flex flex-col gap-3 carousel-track-up">
                {col1Dup.map((game, i) => (
                  <MobileCard
                    key={`mc1-${game.id}-${i}`}
                    game={game}
                    onClick={handleGameClick}
                  />
                ))}
              </div>
            </div>

            {/* Colonne 2 — défile vers le bas */}
            <div className="flex-1 overflow-hidden relative">
              <div className="flex flex-col gap-3 carousel-track-down">
                {col2Dup.map((game, i) => (
                  <MobileCard
                    key={`mc2-${game.id}-${i}`}
                    game={game}
                    onClick={handleGameClick}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ══ TABLET+ : carrousels horizontaux auto-scroll ══ */}
      <div className="hidden sm:flex flex-col flex-1 justify-center gap-5 md:gap-6 py-6 md:py-8">
        {/* Ligne 1 — défile vers la gauche */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="overflow-hidden relative group"
        >
          <div className="absolute left-0 top-0 bottom-0 w-14 md:w-20 z-10 pointer-events-none bg-gradient-to-r from-[#0a0914] to-transparent" />
          <div className="absolute right-0 top-0 bottom-0 w-14 md:w-20 z-10 pointer-events-none bg-gradient-to-l from-[#0a0914] to-transparent" />

          <div className="flex gap-4 md:gap-5 w-max carousel-track-left group-hover:[animation-play-state:paused]">
            {row1Dup.map((game, i) => (
              <CarouselCard
                key={`r1-${game.id}-${i}`}
                game={game}
                onClick={handleGameClick}
              />
            ))}
          </div>
        </motion.div>

        {/* Ligne 2 — défile vers la droite */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          className="overflow-hidden relative group"
        >
          <div className="absolute left-0 top-0 bottom-0 w-14 md:w-20 z-10 pointer-events-none bg-gradient-to-r from-[#0a0914] to-transparent" />
          <div className="absolute right-0 top-0 bottom-0 w-14 md:w-20 z-10 pointer-events-none bg-gradient-to-l from-[#0a0914] to-transparent" />

          <div className="flex gap-4 md:gap-5 w-max carousel-track-right group-hover:[animation-play-state:paused]">
            {row2Dup.map((game, i) => (
              <CarouselCard
                key={`r2-${game.id}-${i}`}
                game={game}
                onClick={handleGameClick}
              />
            ))}
          </div>
        </motion.div>
      </div>

      {/* CTA — toujours en bas */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="text-center py-8 -mt-8 sm:py-10"
      >
        <motion.button
          onClick={() => navigate("/games")}
          whileHover={{
            scale: 1.15,
            boxShadow: "0 0 40px rgba(168,85,247,0.25)",
          }}
          style={{
            fontFamily: "var(--stay-pixel)",
            letterSpacing: "0.35em",
          }}
          whileTap={{ scale: 0.97 }}
          className="px-4 py-2 mb-4 text-lg sm:text-lg md:text-xl rounded-4xl cursor-pointer
            bg-purple-500/[0.08] text-purple-300
            font-extrabold font-heading uppercase
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