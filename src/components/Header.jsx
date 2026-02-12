import { Link, useLocation, useNavigate } from "react-router-dom";

const NAV_ITEMS = [
  { path: "/", label: "Accueil" },
  { path: "/games", label: "Jeux" },
];

export default function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const isDetailPage = location.pathname.startsWith("/game/");

  return (
    <header
      className="px-8 py-3.5 flex items-center justify-between
        border-b border-white/5 bg-[#0a0914]/85 backdrop-blur-xl
        sticky top-0 z-[100]"
    >
      <div className="flex items-center gap-2.5">
        {/* Back button on detail page */}
        {isDetailPage && (
          <button
            onClick={() => navigate(-1)}
            className="w-9 h-9 rounded-lg cursor-pointer mr-1
              bg-purple-500/10 border border-purple-500/30
              text-purple-400 text-base
              flex items-center justify-center
              hover:bg-purple-500/20 transition-colors"
          >
            ←
          </button>
        )}

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5 no-underline">
          <div
            className="w-10 h-10 rounded-lg
              bg-gradient-to-br from-purple-500 to-purple-700
              flex items-center justify-center
              shadow-[0_4px_15px_rgba(139,92,246,0.4)]"
          >
          </div>
          <h1
            className="text-xl font-black font-heading tracking-widest
              bg-gradient-to-br from-purple-200 to-purple-400
              bg-clip-text text-transparent"
              style={{ fontFamily: "var(--stay-pixel)" }}
          >
            Game's Spirit
          </h1>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex gap-1.5">
        {NAV_ITEMS.map((item) => {
          const isActive =
            item.path === "/"
              ? location.pathname === "/"
              : location.pathname.startsWith(item.path);

          return (
            <Link
              key={item.path}
              to={item.path}
              className={`px-3 py-2 rounded-lg text-sm font-bold font-heading
                uppercase tracking-widest no-underline transition-all
                ${
                  isActive
                    ? "bg-purple-500/15 text-purple-300 border border-purple-500/30"
                    : "text-gray-500 border border-transparent hover:text-gray-300"
                }`}
              style={{ fontFamily: "var(--techovier)" }}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>
    </header>
  );
}