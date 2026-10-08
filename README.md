# 🎬 CineVault — Movie & TV Show Discovery Platform

CineVault is a responsive movie and TV show discovery web application that lets users browse trending, popular, and top-rated titles in real time via the TMDB API. It features live search, detailed movie pages with cast info and trailer playback, and a personal watchlist — all wrapped in a Netflix-inspired, cinematic UI.

## 🚀 Features

### Module 1 — Core Setup & Home Page
- Project setup with React (Vite) and Tailwind CSS, with a custom dark cinematic theme
- Responsive Navbar with logo, live search bar (desktop), and search icon with full-screen overlay (mobile)
- TMDB API integration for real-time movie data
- Home page with:
  - Dynamic hero banner showcasing a random trending movie
  - Horizontally scrollable rows: Trending Today, Popular Movies, Top Rated, Upcoming
  - Skeleton loading states for a smooth loading experience

### Module 2 — Movie Details, Watchlist & Search
- **Movie Detail Page** — full movie info (overview, genres, runtime, release year, rating), director, and cast list with photos
- **Trailer Modal** — embedded YouTube trailer playback
- **Watchlist** — add/remove movies from any page, persisted using LocalStorage
- **Watchlist Page** — grid view of saved movies with smooth add/remove animations
- **Search** — live search with a dedicated results page and empty-state handling

### Module 3 — Search & Genre Filtering
- **Debounced live search** — results update automatically about half a second after the user stops typing, reducing unnecessary API calls
- **Genre filter chips** — horizontally scrollable chips (Action, Comedy, Drama, etc.) powered by TMDB's genre list
- **Browse page** — explore popular movies by genre, or combine a search query with a genre filter
- Loading skeletons and friendly empty states for no-result searches

## 🛠️ Tools & Technologies

- React.js (Vite)
- Tailwind CSS
- React Router DOM
- Framer Motion (animations)
- Axios
- TMDB REST API
- LocalStorage (client-side persistence)
- Lucide React (icons)

## ⚙️ Setup Instructions

1. Clone the repository
```bash
   git clone https://github.com/aribawaseemsiddiqui08/cinevault.git
   cd cinevault
```

2. Install dependencies
```bash
   npm install
```

3. Create a `.env` file in the root directory and add your TMDB API key
VITE_TMDB_API_KEY=your_api_key_here

4. Run the development server
```bash
   npm run dev
```

5. Open `http://localhost:5173` in your browser

## 📂 Project Structure
src/
├── components/ # Navbar, MovieCard, MovieRow, SkeletonCard
├── pages/ # Home, MovieDetail, SearchResults, Watchlist
├── services/ # TMDB API service
├── hooks/ # useWatchlist (LocalStorage logic)
├── App.jsx
└── main.jsx
├── hooks/          # useWatchlist, useDebounce

## 👩‍💻 Author

**Ariba**
Frontend Web Development Intern — Zynvex Solutions
