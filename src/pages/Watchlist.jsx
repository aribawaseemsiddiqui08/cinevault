import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { BookmarkX, Film } from "lucide-react";
import { useWatchlist } from "../hooks/useWatchlist";
import { getImageUrl } from "../services/tmdb";

function Watchlist() {
  const { watchlist, toggleWatchlist } = useWatchlist();

  return (
    <div className="pt-24 px-6 sm:px-12 pb-16 max-w-6xl mx-auto min-h-screen">
      <h1 className="text-2xl sm:text-3xl font-bold mb-8">My Watchlist</h1>

      {watchlist.length === 0 ? (
        <div className="flex flex-col items-center justify-center text-center py-20">
          <Film size={48} className="text-cine-text-muted mb-4" />
          <p className="text-cine-text-muted mb-2">Your watchlist is empty.</p>
          <p className="text-cine-text-muted text-sm mb-6">
            Add movies you want to watch later.
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
            {watchlist.map((movie) => (
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
                </Link>

                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={(e) => {
                    e.preventDefault();
                    toggleWatchlist(movie);
                  }}
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