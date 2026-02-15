import { useState, useMemo, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import games from "../data/games.json";
import reviews from "../data/users.json";
import { getReviewStats } from "../utils/reviewStats";
import Description from "../components/ui/Description";
import GameCard from "../components/ui/GameCard";

const SORT_OPTIONS = [
  { value: "year", label: "Plus récents" },
  { value: "title", label: "A → Z" },
  { value: "price-asc", label: "Prix croissant" },
  { value: "price-desc", label: "Prix décroissant" },
];

/* ═══════════════════════════════════
   CUSTOM DROPDOWN — Techovier font
   ═══════════════════════════════════ */
const Dropdown = ({ label, value, options, onChange }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const current = options.find((o) => o.value === value);

  return (
    <div ref={ref} className="relative w-full md:w-auto md:min-w-[170px]">
      <button
        onClick={() => setOpen(!open)}
        className={`w-full flex items-center justify-between gap-2
          px-4 py-3 rounded-xl text-sm
          cursor-pointer transition-all duration-300 border
          ${
            open
              ? "bg-purple-500/10 border-purple-500/30 text-purple-200 shadow-[0_0_20px_rgba(168,85,247,0.1)]"
              : "bg-white/[0.04] border-white/[0.06] text-gray-300 hover:border-purple-500/20 hover:bg-white/[0.06]"
          }`}
      >
        <div className="flex flex-col items-start">
          <span
            style={{ fontFamily: "var(--techovier)", letterSpacing: "0.25em" }}
            className="text-[8px] sm:text-[9px] uppercase text-gray-600 leading-none mb-0.5"
          >
            {label}
          </span>
          <span
            style={{ fontFamily: "var(--techovier)", letterSpacing: "0.15em" }}
            className="font-bold text-xs sm:text-sm"
          >
            {current?.label}
          </span>
        </div>
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="text-[10px] text-purple-400/60"
        >
          ▼
        </motion.span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.97 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="absolute top-full left-0 right-0 mt-2 z-[200]
              p-1.5 rounded-xl
              bg-[#16132b]/95 border border-purple-500/15
              backdrop-blur-2xl
              shadow-[0_16px_48px_rgba(0,0,0,0.5),0_0_24px_rgba(139,92,246,0.08)]"
          >
            {options.map((option) => (
              <button
                key={option.value}
                onClick={() => {
                  onChange(option.value);
                  setOpen(false);
                }}
                style={{ fontFamily: "var(--techovier)", letterSpacing: "0.15em" }}
                className={`w-full flex items-center justify-between
                  px-3.5 py-2.5 rounded-lg text-sm
                  cursor-pointer transition-all duration-150 text-left
                  ${
                    value === option.value
                      ? "bg-purple-500/15 text-purple-200 font-bold"
                      : "text-gray-400 hover:bg-white/[0.06] hover:text-gray-200"
                  }`}
              >
                <span>{option.label}</span>
                {value === option.value && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="text-purple-400 text-xs"
                  >
                    ✓
                  </motion.span>
                )}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

/* ═══════════════════════════════════
   LIST GAMES PAGE
   ═══════════════════════════════════ */
const ListGames = () => {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [genre, setGenre] = useState("Tous");
  const [sortBy, setSortBy] = useState("year");
  const [inputFocused, setInputFocused] = useState(false);

  const genres = useMemo(() => {
    const unique = [...new Set(games.map((g) => g.genre))];
    return ["Tous", ...unique.sort()];
  }, []);

  const genreOptions = genres.map((g) => ({
    value: g,
    label: g === "Tous" ? "Tous les genres" : g,
  }));

  const getStats = (gameId) => {
    const gameReviews = reviews.filter((r) => r.gameId === gameId);
    return getReviewStats(gameReviews);
  };

  const filtered = useMemo(() => {
    return games
      .filter((g) => g.title.toLowerCase().includes(search.toLowerCase()))
      .filter((g) => genre === "Tous" || g.genre === genre)
      .sort((a, b) => {
        if (sortBy === "year") return b.year - a.year;
        if (sortBy === "title") return a.title.localeCompare(b.title);
        if (sortBy === "price-asc") return a.price - b.price;
        if (sortBy === "price-desc") return b.price - a.price;
        return 0;
      });
  }, [search, genre, sortBy]);

  const resetFilters = () => {
    setSearch("");
    setGenre("Tous");
    setSortBy("year");
  };

  const hasActiveFilters = search || genre !== "Tous" || sortBy !== "year";

  return (
    <section
      id="list-games"
      className="min-h-screen"
      style={{
        background:
          "radial-gradient(circle, rgba(139,92,246,0.12) 0%, transparent 70%)",
      }}
    >
      <Description
        title="Tous les "
        subtitle="jeux"
        sentence="Explorez le catalogue complet et trouvez votre prochaine aventure."
      />

      {/* ══ BARRE DE FILTRES ══ */}
      <motion.div
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mx-auto max-w-6xl px-3 py-1 sm:px-6 mb-6 mt-2 relative z-50"
      >
        <div
          className={`p-3 rounded-2xl flex flex-col gap-3 md:flex-row md:gap-2
            backdrop-blur-md transition-all duration-500
            ${
              inputFocused
                ? "bg-white/[0.05] border border-purple-500/20 shadow-[0_8px_40px_rgba(139,92,246,0.1)]"
                : "bg-white/[0.02] border border-white/[0.05] shadow-[0_8px_32px_rgba(0,0,0,0.2)]"
            }`}
        >
          {/* Recherche — Techovier */}
          <div className="flex-1 relative">
            <input
              type="text"
              placeholder="Rechercher un jeu..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onFocus={() => setInputFocused(true)}
              onBlur={() => setInputFocused(false)}
              style={{ fontFamily: "var(--techovier)", letterSpacing: "0.2em" }}
              className="w-full mt-1 bg-white/[0.03] rounded-xl
                pl-4 pr-11 py-3 text-gray-100 text-sm
                border border-transparent outline-none
                transition-all duration-300
                placeholder:text-gray-600
                focus:bg-white/[0.05]"
            />
            <AnimatePresence>
              {search && (
                <motion.button
                  initial={{ opacity: 0, scale: 0.5, rotate: -90 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  exit={{ opacity: 0, scale: 0.5, rotate: 90 }}
                  transition={{ duration: 0.15 }}
                  onClick={() => setSearch("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2
                    w-6 h-6 rounded-full
                    bg-white/10 text-gray-400 text-sm
                    flex items-center justify-center
                    cursor-pointer hover:bg-purple-500/20 hover:text-purple-300
                    transition-colors"
                >
                  ✕
                </motion.button>
              )}
            </AnimatePresence>
          </div>

          {/* Séparateurs */}
          <div className="block md:hidden h-[1px] w-full bg-white/[0.06]" />
          <div className="hidden md:block w-[1px] my-2 bg-white/[0.06]" />

          {/* Dropdowns */}
          <div className="flex gap-2 md:contents">
            <Dropdown
              label="Genre"
              value={genre}
              options={genreOptions}
              onChange={setGenre}
            />

            <div className="hidden md:block w-[1px] my-2 bg-white/[0.06]" />

            <Dropdown
              label="Trier par"
              value={sortBy}
              options={SORT_OPTIONS}
              onChange={setSortBy}
            />
          </div>
        </div>

        {/* Filtres actifs */}
        <AnimatePresence>
          {hasActiveFilters && (
            <motion.div
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.2 }}
              className="flex items-center gap-2 mt-3 px-2 flex-wrap"
            >
              <span
                style={{ fontFamily: "var(--techovier)", letterSpacing: "0.25em" }}
                className="text-[10px] text-white uppercase mr-1"
              >
                Filtres :
              </span>

              {search && (
                <motion.span
                  layout
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  onClick={() => setSearch("")}
                  style={{ fontFamily: "var(--stay-pixel)", letterSpacing: "0.2em" }}
                  className="px-2.5 py-1 rounded-lg text-[10px] sm:text-sm
                    bg-purple-500/10 text-purple-300 border border-purple-500/20
                    cursor-pointer hover:bg-purple-500/20 transition-colors"
                >
                  "{search}" ✕
                </motion.span>
              )}

              {genre !== "Tous" && (
                <motion.span
                  layout
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  onClick={() => setGenre("Tous")}
                  style={{ fontFamily: "var(--techovier)", letterSpacing: "0.2em" }}
                  className="px-2.5 py-1 rounded-lg text-[10px] sm:text-[11px]
                    bg-purple-500/10 text-purple-300 border border-purple-500/20
                    cursor-pointer hover:bg-purple-500/20 transition-colors"
                >
                  {genre} ✕
                </motion.span>
              )}

              {sortBy !== "year" && (
                <motion.span
                  layout
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  onClick={() => setSortBy("year")}
                  style={{ fontFamily: "var(--techovier)", letterSpacing: "0.2em" }}
                  className="px-2.5 py-1 rounded-lg text-[10px] sm:text-[11px]
                    bg-purple-500/10 text-purple-300 border border-purple-500/20
                    cursor-pointer hover:bg-purple-500/20 transition-colors"
                >
                  {SORT_OPTIONS.find((s) => s.value === sortBy)?.label} ✕
                </motion.span>
              )}

              <span
                onClick={resetFilters}
                style={{ fontFamily: "var(--techovier)", letterSpacing: "0.2em" }}
                className="text-[10px] text-white cursor-pointer
                  hover:text-gray-300 transition-colors ml-1"
              >
                Tout effacer
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* ══ GRILLE DE JEUX ══ */}
      <div className="px-3 sm:px-6 md:px-10 pb-16 relative z-0">
        {filtered.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center py-20"
          >
            <span className="text-5xl mb-4">🎮</span>
            <p
              style={{ fontFamily: "var(--techovier)", letterSpacing: "0.15em" }}
              className="text-white text-base sm:text-lg mb-2"
            >
              Aucun jeu trouvé
            </p>
            <p
              style={{ fontFamily: "var(--stay-pixel)", letterSpacing: "0.2em" }}
              className="text-white text-[10px] sm:text-xs mb-5"
            >
              Essayez d'autres filtres
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={resetFilters}
              style={{ fontFamily: "var(--stay-pixel)", letterSpacing: "0.25em" }}
              className="px-3 py-2.5 rounded-xl text-sm -mt-2 font-bold
                bg-purple-500/10 text-purple-400 border border-purple-500/20
                cursor-pointer hover:bg-purple-500/20 transition-colors"
            >
              Réinitialiser
            </motion.button>
          </motion.div>
        ) : (
          <motion.div
            layout
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4 -mb-7"
          >
            <AnimatePresence mode="popLayout">
              {filtered.map((game, i) => (
                <GameCard
                  key={game.id}
                  game={game}
                  stats={getStats(game.id)}
                  index={i}
                  onClick={() => navigate(`/game/${game.slug}`)}
                />
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default ListGames;