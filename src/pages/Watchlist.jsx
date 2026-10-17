import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { BookmarkX, Film, Star, Trash2 } from "lucide-react";
import { useWatchlist } from "../hooks/useWatchlist";
import { getImageUrl } from "../services/tmdb";

function Watchlist() {
  const { watchlist, toggleWatchlist, clearWatchlist } = useWatchlist();
  const [sortBy, setSortBy] = useState("recent");

  const sortedList = useMemo(() => {
    const list = [...watchlist];
    if (sortBy === "rating") {
      list.sort((a, b) => (b.vote_average || 0) - (a.vote_average || 0));
    } else if (sortBy === "title") {
      list.sort((a, b) => (a.title || "").localeCompare(b.title || ""));
    }
    return list; // "recent" mein wahi order jo saved hai (naya upar)
  }, [watchlist, sortBy]);

  const handleClear = () => {
    if (window.confirm("Remove all movies from your watchlist?")) {
      clearWatchlist();
    }
  };

  return (
    <div className="pt-24 px-6 sm:px-12 pb-16 max-w-6xl mx-auto min-h-screen">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold">
          My Watchlist
          {watchlist.length > 0 && (
            <span className="text-cine-text-muted text-lg font-medium ml-3">
              ({watchlist.length})
            </span>
          )}
        </h1>

        {watchlist.length > 0 && (
          <div className="flex items-center gap-3">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-cine-card border border-white/10 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-cine-accent"
            >
              <option value="recent" className="bg-cine-card">Recently added</option>
              <option value="rating" className="bg-cine-card">Highest rated</option>
              <option value="title" className="bg-cine-card">Title (A-Z)</option>
            </select>

            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={handleClear}
              className="flex items-center gap-2 text-sm bg-white/10 hover:bg-cine-accent transition-colors px-3 py-2 rounded-lg"
            >
              <Trash2 size={16} />
              Clear all
            </motion.button>
          </div>
        )}
      </div>

      {watchlist.length === 0 ? (
        <div className="flex flex-col items-center justify-center text-center py-20">
          <Film size={48} className="text-cine-text-muted mb-4" />
          <p className="text-cine-text-muted mb-2">Your watchlist is empty.</p>
          <p className="text-cine-text-muted text-sm mb-6">
            Tap the bookmark icon on any movie to save it here.
          </p>
          <Link
            to="/"
            className="bg-cine-accent hover:bg-cine-accent-light transition-colors font-semibold px-6 py-3 rounded-lg text-sm"
          >
            Browse Movies
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
          <AnimatePresence>
            {sortedList.map((movie) => (
              <motion.div
                key={movie.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="relative group"
              >
                <Link to={`/movie/${movie.id}`}>
                  <div className="aspect-2/3 rounded-lg overflow-hidden bg-cine-card">
                    {movie.poster_path ? (
                      <img
                        src={getImageUrl(movie.poster_path)}
                        alt={movie.title}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-cine-text-muted text-sm">
                        No Image
                      </div>
                    )}
                  </div>
                  <p className="mt-2 text-sm font-medium line-clamp-1">
                    {movie.title}
                  </p>
                  <div className="flex items-center gap-2 text-xs text-cine-text-muted mt-1">
                    <Star size={12} className="text-yellow-400 fill-yellow-400" />
                    <span>{movie.vote_average?.toFixed(1)}</span>
                    {movie.release_date && (
                      <span>• {movie.release_date.split("-")[0]}</span>
                    )}
                  </div>
                </Link>

                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={() => toggleWatchlist(movie)}
                  className="absolute top-2 right-2 bg-black/70 backdrop-blur-sm p-2 rounded-full hover:bg-cine-accent transition-colors"
                  title="Remove from watchlist"
                >
                  <BookmarkX size={16} />
                </motion.button>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}

export default Watchlist;