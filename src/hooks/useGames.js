import { useState, useEffect, useMemo } from "react";

export function useGames() {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Filtres
  const [search, setSearch] = useState("");
  const [genre, setGenre] = useState("Tous");
  const [sortBy, setSortBy] = useState("year");

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const res = await fetch("/data/games.json");
        if (!res.ok) throw new Error("Erreur lors du chargement des jeux");
        const data = await res.json();
        setGames(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchGames();
  }, []);

  // Liste des genres disponibles (dynamique)
  const genres = useMemo(() => {
    const uniqueGenres = [...new Set(games.map((g) => g.genre))];
    return ["Tous", ...uniqueGenres.sort()];
  }, [games]);

  // Jeux filtrés et triés
  const filtered = useMemo(() => {
    return games
      .filter((g) => g.title.toLowerCase().includes(search.toLowerCase()))
      .filter((g) => genre === "Tous" || g.genre === genre)
      .sort((a, b) => {
        if (sortBy === "year") return b.year - a.year;
        if (sortBy === "title") return a.title.localeCompare(b.title);
        return 0;
      });
  }, [games, search, genre, sortBy]);

  // Trouver un jeu par son slug
  const getGameBySlug = (slug) => games.find((g) => g.slug === slug) || null;

  // Jeux similaires (même genre ou plateforme commune)
  const getSimilarGames = (game, limit = 4) => {
    if (!game) return [];
    return games
      .filter(
        (g) =>
          g.id !== game.id &&
          (g.genre === game.genre ||
            g.platform.some((p) => game.platform.includes(p)))
      )
      .slice(0, limit);
  };

  return {
    // Data
    games,
    filtered,
    genres,
    loading,
    error,

    // Filtres
    search,
    setSearch,
    genre,
    setGenre,
    sortBy,
    setSortBy,

    // Helpers
    getGameBySlug,
    getSimilarGames,
  };
}