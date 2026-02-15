import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";

const NAV_ITEMS = [
  { path: "/", label: "Accueil" },
  { path: "/games", label: "Jeux" },
];

export default function Header() {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header
      className="px-5 md:px-8 py-3.5 flex items-center justify-between
        border-b border-white/5 bg-[#0a0914]/85 backdrop-blur-xl
        sticky top-0 z-[999]"
    >
      {/* Logo */}
      <Link to="/" className="flex items-center gap-2.5 no-underline">
        <div
          className="w-9 h-9 md:w-10 md:h-10 rounded-lg
            bg-gradient-to-br from-purple-500 to-purple-700
            flex items-center justify-center
            shadow-[0_4px_15px_rgba(139,92,246,0.4)]"
        >
        </div>
        <h1
          className="text-lg md:text-xl font-black font-heading tracking-wide
            bg-gradient-to-br from-purple-200 to-purple-400
            bg-clip-text text-transparent"
        >
          Game's Spirit
        </h1>
      </Link>

      {/* Nav desktop */}
      <nav className="hidden md:flex gap-1.5">
        {NAV_ITEMS.map((item) => {
          const isActive =
            item.path === "/"
              ? location.pathname === "/"
              : location.pathname.startsWith(item.path);

          return (
            <Link
              key={item.path}
              to={item.path}
              style={{ fontFamily: "var(--stay-pixel)", letterSpacing: "0.35em" }}
              className={`px-4 py-2 rounded-lg text-md font-bold font-heading
                uppercase tracking-wide no-underline transition-all
                ${
                  isActive
                    ? "bg-purple-500/15 text-purple-300 border border-purple-500/30"
                    : "text-gray-500 border border-transparent hover:text-gray-300"
                }`}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Hamburger mobile */}
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="md:hidden flex flex-col gap-[5px] cursor-pointer p-1"
        aria-label="Menu"
      >
        <motion.span
          animate={menuOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
          className="block w-6 h-[2px] bg-purple-400 rounded-full origin-center"
        />
        <motion.span
          animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
          className="block w-6 h-[2px] bg-purple-400 rounded-full"
        />
        <motion.span
          animate={menuOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
          className="block w-6 h-[2px] bg-purple-400 rounded-full origin-center"
        />
      </button>

      {/* Menu mobile overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 right-0
              bg-[#0a0914]/95 backdrop-blur-xl
              border-b border-white/5
              p-4 flex flex-col gap-2 md:hidden"
          >
            {NAV_ITEMS.map((item) => {
              const isActive =
                item.path === "/"
                  ? location.pathname === "/"
                  : location.pathname.startsWith(item.path);

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setMenuOpen(false)}
                  className={`px-4 py-3 rounded-xl text-sm font-bold font-heading
                    uppercase tracking-wide no-underline transition-all text-center
                    ${
                      isActive
                        ? "bg-purple-500/15 text-purple-300 border border-purple-500/30"
                        : "text-gray-400 border border-white/[0.05] hover:text-gray-200"
                    }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}