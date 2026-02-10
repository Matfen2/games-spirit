# 🎮 Game's Spirit

**Catalogue de jeux vidéo communautaire avec système d'avis inspiré de Steam.**

Explorez les meilleurs jeux par plateforme, genre et avis de la communauté. Parcourez le catalogue, lisez les avis des joueurs, et construisez votre wishlist.

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-6-646CFF?logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-3.4-06B6D4?logo=tailwindcss&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-blue?logo=docker&logoColor=white)
![GitHub Actions](https://img.shields.io/badge/CI/CD-GitHub_Actions-2088FF?logo=githubactions&logoColor=white)

---

## 📸 Aperçu

> _Screenshots à venir après le développement des pages._

---

## 🚀 Stack technique

| Catégorie | Technologie |
|-----------|-------------|
| **Frontend** | React 19 + Vite + Tailwind CSS |
| **Routing** | React Router v7 |
| **Données** | Fichiers JSON (simulation API) |
| **Conteneurisation** | Docker (multi-stage build) |
| **CI/CD** | GitHub Actions |
| **Serveur prod** | Nginx Alpine |

---

## 🏗️ Architecture du projet

```
games-spirit/
├── public/
│   └── data/
│       ├── games.json          # Catalogue des jeux
│       └── reviews.json        # Avis des joueurs
├── src/
│   ├── components/
│   │   ├── layout/             # Header, Footer
│   │   ├── ui/                 # GameCard, Carousel, ReviewCard, FilterSidebar...
│   │   └── sections/           # HeroBanner, ReviewSection, GameInfoCard
│   ├── pages/
│   │   ├── HomePage.jsx        # Accueil — Hero + Carrousels
│   │   ├── GamesPage.jsx       # Catalogue — Grille + Filtres
│   │   └── GameDetailPage.jsx  # Détail — Fiche + Avis communautaires
│   ├── hooks/                  # useGames, useReviews
│   ├── utils/                  # reviewStats
│   ├── App.jsx
│   └── main.jsx
├── Dockerfile
├── docker-compose.yml
├── nginx.conf
├── .github/workflows/
│   └── ci.yml
└── README.md
```

---

## ⚙️ Installation

### Prérequis

- Node.js 20+
- npm 10+
- Docker (optionnel)

### Développement local

```bash
# Cloner le repo
git clone https://github.com/Matfen2/games-spirit.git
cd games-spirit

# Installer les dépendances
npm install

# Lancer le serveur de développement
npm run dev
```

L'application sera accessible sur `http://localhost:5173`

### Avec Docker

```bash
# Build et lancement
docker compose up --build

# Ou en production
docker build -t games-spirit .
docker run -p 8080:80 games-spirit
```

L'application sera accessible sur `http://localhost:8080`

---

## 🔄 Pipeline CI/CD

À chaque push sur `main`, le pipeline GitHub Actions exécute :

1. **Lint** — Vérification de la qualité du code (ESLint)
2. **Build** — Compilation de l'application (Vite)
3. **Audit** — Scan des vulnérabilités (npm audit)
4. **Deploy** — Déploiement automatique

---

## 📄 Pages

### 🏠 Page d'accueil
- Hero section avec titre et description
- Carrousel "Les mieux notés" (triés par % d'avis positifs)
- Carrousel "Nouveautés" (triés par année)
- CTA vers le catalogue

### 📋 Catalogue
- Grille responsive de jeux (3 colonnes)
- Sidebar de filtres (recherche, catégorie, tri)
- Compteur de résultats
- Filtres actifs en pills cliquables

### 📄 Détail d'un jeu
- Banner hero plein écran
- Description et points forts
- Système d'avis communautaire style Steam :
  - Barre de sentiment (👍 positifs / 👎 négatifs)
  - Filtres par type d'avis
  - Carte d'avis avec pseudo, heures de jeu et bouton "Utile"
- Fiche technique sticky
- Jeux similaires

---

## 🐳 Docker — Multi-stage build

Le Dockerfile utilise un build en 2 étapes pour une image de production légère :

| Stage | Image | Rôle |
|-------|-------|------|
| Build | `node:20-alpine` | Installation + compilation |
| Production | `nginx:alpine` | Serveur statique (~25 MB) |

---

## 🗺️ Roadmap

- [x] Initialisation du projet (React + Vite + Tailwind)
- [ ] Données JSON (jeux + avis)
- [ ] Composants UI (GameCard, Carousel, ReviewCard...)
- [ ] Page d'accueil
- [ ] Page catalogue avec filtres
- [ ] Page détail avec avis communautaires
- [ ] Dockerisation (multi-stage)
- [ ] Pipeline CI/CD GitHub Actions
- [ ] Responsive mobile
- [ ] Déploiement

---

## 👤 Auteur

**Mathieu FENOUIL** — Full-Stack Developer

- 🔗 [LinkedIn](https://www.linkedin.com/in/mathieu-fenouil/)
- 🐙 [GitHub](https://github.com/Matfen2)

---