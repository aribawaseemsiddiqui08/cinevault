import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Star, Bookmark, BookmarkCheck } from "lucide-react";
import { getImageUrl } from "../services/tmdb";
import { useWatchlist } from "../hooks/useWatchlist";

function MovieCard({ movie }) {
  const { isInWatchlist, toggleWatchlist } = useWatchlist();
  const saved = isInWatchlist(movie.id);

  const handleBookmark = (e) => {
    // Card ek Link hai, isliye click pe page open hone se roko
    e.preventDefault();
    e.stopPropagation();
    toggleWatchlist(movie);
  };

  return (
    <Link to={`/movie/${movie.id}`}>
      <motion.div
        whileHover={{ scale: 1.05, y: -8 }}
        transition={{ duration: 0.25 }}
        className="relative w-40 sm:w-48 shrink-0 rounded-lg overflow-hidden bg-cine-card shadow-lg cursor-pointer group"
      >
        <div className="aspect-2/3 overflow-hidden">
          {movie.poster_path ? (
            <img
              src={getImageUrl(movie.poster_path)}
              alt={movie.title}
              loading="lazy"
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-cine-card text-cine-text-muted text-sm">
              No Image
            </div>
          )}

          {/* Rating badge */}
          <div className="absolute top-2 right-2 bg-black/70 backdrop-blur-sm rounded-full px-2 py-1 flex items-center gap-1">
            <Star size={12} className="text-yellow-400 fill-yellow-400" />
            <span className="text-xs font-semibold">
              {movie.vote_average?.toFixed(1)}
            </span>
          </div>

          {/* Gradient overlay + title on hover */}
          <div className="absolute inset-0 bg-linear-to-t from-black/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3">
            <p className="text-sm font-semibold line-clamp-2">{movie.title}</p>
          </div>

          {/* Bookmark button (overlay ke baad rakha hai taake upar rahe) */}
          <motion.button
            whileTap={{ scale: 0.85 }}
            onClick={handleBookmark}
            aria-label={saved ? "Remove from watchlist" : "Add to watchlist"}
            className={`absolute top-2 left-2 z-10 p-1.5 rounded-full backdrop-blur-sm transition-colors ${
              saved
                ? "bg-cine-accent text-white"
                : "bg-black/70 text-white hover:bg-cine-accent"
            }`}
          >
            {saved ? <BookmarkCheck size={14} /> : <Bookmark size={14} />}
          </motion.button>
        </div>
      </motion.div>
    </Link>
  );
}

export default MovieCard;