import { useState, useEffect, useCallback, useMemo } from "react";
import { WatchlistContext } from "./watchlistContext";

const STORAGE_KEY = "cinevault_watchlist";

function loadWatchlist() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

export function WatchlistProvider({ children }) {
  const [watchlist, setWatchlist] = useState(loadWatchlist);

  // Watchlist badalte hi LocalStorage mein save karo
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(watchlist));
    } catch (error) {
      console.error("Could not save watchlist:", error);
    }
  }, [watchlist]);

  // Doosre browser tab mein change ho to yahan bhi sync karo
  useEffect(() => {
    const handleStorage = (e) => {
      if (e.key === STORAGE_KEY) setWatchlist(loadWatchlist());
    };
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  const isInWatchlist = useCallback(
    (movieId) => watchlist.some((m) => m.id === movieId),
    [watchlist]
  );

  const toggleWatchlist = useCallback((movie) => {
    setWatchlist((prev) => {
      if (prev.some((m) => m.id === movie.id)) {
        return prev.filter((m) => m.id !== movie.id);
      }
      // Sirf zaroori fields save karo (poora movie object bohot bara hota hai)
      const saved = {
        id: movie.id,
        title: movie.title,
        poster_path: movie.poster_path,
        backdrop_path: movie.backdrop_path,
        vote_average: movie.vote_average,
        release_date: movie.release_date,
      };
      return [saved, ...prev]; // naya movie sabse upar
    });
  }, []);

  const clearWatchlist = useCallback(() => setWatchlist([]), []);

  const value = useMemo(
    () => ({ watchlist, isInWatchlist, toggleWatchlist, clearWatchlist }),
    [watchlist, isInWatchlist, toggleWatchlist, clearWatchlist]
  );

  return (
    <WatchlistContext.Provider value={value}>
      {children}
    </WatchlistContext.Provider>
  );
}