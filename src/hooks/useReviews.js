import { useState, useEffect, useMemo } from "react";
import { getReviewStats } from "../utils/reviewStats";

export function useReviews(gameId) {
  const [allReviews, setAllReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Filtre d'affichage : "all", "pos", "neg"
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await fetch("/data/reviews.json");
        if (!res.ok) throw new Error("Erreur lors du chargement des avis");
        const data = await res.json();
        setAllReviews(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  // Avis du jeu courant
  const gameReviews = useMemo(() => {
    if (!gameId) return [];
    return allReviews.filter((r) => r.gameId === gameId);
  }, [allReviews, gameId]);

  // Avis filtrés par sentiment
  const filtered = useMemo(() => {
    if (filter === "pos") return gameReviews.filter((r) => r.recommended);
    if (filter === "neg") return gameReviews.filter((r) => !r.recommended);
    return gameReviews;
  }, [gameReviews, filter]);

  // Stats du jeu courant
  const stats = useMemo(() => getReviewStats(gameReviews), [gameReviews]);

  // Stats pour un jeu spécifique (utilisé par les cartes sur la liste)
  const getStatsForGame = (id) => {
    const reviews = allReviews.filter((r) => r.gameId === id);
    return getReviewStats(reviews);
  };

  // Reset le filtre quand on change de jeu
  useEffect(() => {
    setFilter("all");
  }, [gameId]);

  return {
    // Data
    reviews: filtered,
    allReviews: gameReviews,
    stats,
    loading,
    error,

    // Filtre
    filter,
    setFilter,

    // Helper
    getStatsForGame,
  };
}