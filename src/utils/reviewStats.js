/**
 * Calcule les statistiques de sentiment pour un ensemble d'avis.
 *
 * @param {Array} reviews - Liste des avis d'un jeu
 * @returns {Object} { total, pos, neg, pct, label, color }
 */
export function getReviewStats(reviews) {
  const total = reviews.length;
  const pos = reviews.filter((r) => r.recommended).length;
  const neg = total - pos;
  const pct = total > 0 ? Math.round((pos / total) * 100) : 0;

  let label = "Aucun avis";
  let color = "#6b7280";

  if (total > 0) {
    if (pct >= 95) {
      label = "Extrêmement positives";
      color = "#22c55e";
    } else if (pct >= 80) {
      label = "Très positives";
      color = "#22c55e";
    } else if (pct >= 70) {
      label = "Majoritairement positives";
      color = "#86efac";
    } else if (pct >= 60) {
      label = "Mitigées";
      color = "#f59e0b";
    } else if (pct >= 40) {
      label = "Plutôt négatives";
      color = "#f97316";
    } else {
      label = "Négatives";
      color = "#ef4444";
    }
  }

  return { total, pos, neg, pct, label, color };
}

/**
 * Retourne l'emoji correspondant au pourcentage de sentiment.
 *
 * @param {number} pct - Pourcentage d'avis positifs
 * @returns {string} Emoji
 */
export function getSentimentEmoji(pct) {
  if (pct >= 80) return "👍";
  if (pct >= 60) return "👌";
  return "👎";
}