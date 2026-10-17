# 🎬 CineVault — Movie & TV Show Discovery Platform

CineVault is a responsive movie and TV show discovery web application that lets users browse trending, popular, and top-rated titles in real time via the TMDB API. It features debounced live search, genre filtering, detailed movie pages with cast info and trailer playback, and a persistent personal watchlist, all wrapped in a Netflix-inspired, cinematic UI.

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
- **Watchlist** — add/remove movies, persisted using LocalStorage
- **Search** — search results page with empty-state handling

### Module 3 — Search & Genre Filtering
- **Debounced live search** — results update automatically about half a second after the user stops typing, reducing unnecessary API calls
- **Genre filter chips** — horizontally scrollable chips (Action, Comedy, Drama, etc.) powered by TMDB's genre list
- **Browse page** — explore popular movies by genre, or combine a search query with a genre filter
- Loading skeletons and friendly empty states for no-result searches

### Module 4 — Watchlist
- **One-tap bookmark** on every movie card (Home, Browse, Search) and on the detail page
- **Shared watchlist state** via React Context, so the Navbar shows a live count badge
- **Persistent storage** using LocalStorage, with cross-tab sync
- **Watchlist page** with smooth add/remove animations, sorting (recently added, highest rated, A-Z), and a clear-all option
- Only essential movie fields are stored, keeping LocalStorage lightweight
- **Mark as watched** with a personal 1-5 star rating, plus All / To Watch / Watched tabs
- **"You May Also Like"** recommendations row on every movie detail page
- **Surprise Me** button that opens a random popular movie

## 🛠️ Tools & Technologies

- React.js (Vite)
- Tailwind CSS
- React Router DOM
- React Context API
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
```
   VITE_TMDB_API_KEY=your_api_key_here
```

4. Run the development server
```bash
   npm run dev
```

5. Open `http://localhost:5173` in your browser

## 📂 Project Structure

```
src/
├── components/     # Navbar, MovieCard, MovieRow, SkeletonCard
├── context/        # WatchlistProvider (shared watchlist state)
├── hooks/          # useWatchlist, useDebounce
├── pages/          # Home, MovieDetail, SearchResults, Watchlist
├── services/       # TMDB API service
├── App.jsx
└── main.jsx
```

## 👩‍💻 Author

**Ariba**
Frontend Web Development Intern — Zynvex Solutions