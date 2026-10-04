import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Star, Clock, Calendar, Bookmark, BookmarkCheck, Play, X } from "lucide-react";
import { getMovieDetails, getImageUrl } from "../services/tmdb";
import { useWatchlist } from "../hooks/useWatchlist";

function MovieDetail() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showTrailer, setShowTrailer] = useState(false);
  const { isInWatchlist, toggleWatchlist } = useWatchlist();

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchMovie = async () => {
      setLoading(true);
      try {
        const data = await getMovieDetails(id);
        setMovie(data);
      } catch (error) {
        console.error("Error fetching movie details:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchMovie();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-12 h-12 border-4 border-cine-accent border-t-transparent rounded-full"
        />
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-cine-text-muted">Movie not found.</p>
      </div>
    );
  }

  const trailer = movie.videos?.results?.find(
    (v) => v.type === "Trailer" && v.site === "YouTube"
  );
  const director = movie.credits?.crew?.find((c) => c.job === "Director");
  const cast = movie.credits?.cast?.slice(0, 8) || [];
  const inWatchlist = isInWatchlist(movie.id);

  return (
    <div className="pb-16">
      {/* Backdrop */}
      <div className="relative h-[45vh] sm:h-[60vh] w-full">
        <img
          src={getImageUrl(movie.backdrop_path, "original")}
          alt={movie.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-t from-cine-dark via-cine-dark/70 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative -mt-24 sm:-mt-40 px-6 sm:px-12 max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row gap-8">
          {/* Poster */}
          <motion.img
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            src={getImageUrl(movie.poster_path)}
            alt={movie.title}
            className="w-40 sm:w-64 rounded-xl shadow-2xl shrink-0 mx-auto sm:mx-0"
          />

          {/* Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex-1"
          >
            <h1 className="text-2xl sm:text-5xl font-bold mb-3 text-center sm:text-left">
              {movie.title}
            </h1>

            {movie.tagline && (
              <p className="text-cine-text-muted italic mb-4 text-center sm:text-left">
                {movie.tagline}
              </p>
            )}

            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 mb-6 text-sm">
              <div className="flex items-center gap-1 bg-yellow-400/10 text-yellow-400 px-3 py-1 rounded-full">
                <Star size={16} className="fill-yellow-400" />
                <span className="font-semibold">{movie.vote_average?.toFixed(1)}</span>
                <span className="text-cine-text-muted">/10</span>
              </div>
              {movie.runtime > 0 && (
                <div className="flex items-center gap-1 text-cine-text-muted">
                  <Clock size={16} />
                  {Math.floor(movie.runtime / 60)}h {movie.runtime % 60}m
                </div>
              )}
              <div className="flex items-center gap-1 text-cine-text-muted">
                <Calendar size={16} />
                {movie.release_date?.split("-")[0]}
              </div>
            </div>

            <div className="flex flex-wrap justify-center sm:justify-start gap-2 mb-6">
              {movie.genres?.map((g) => (
                <span
                  key={g.id}
                  className="text-xs bg-cine-card border border-white/10 px-3 py-1 rounded-full"
                >
                  {g.name}
                </span>
              ))}
            </div>

            <p className="text-gray-300 leading-relaxed mb-6 max-w-2xl text-sm sm:text-base text-center sm:text-left">
              {movie.overview}
            </p>

            {director && (
              <p className="text-sm text-cine-text-muted mb-6 text-center sm:text-left">
                <span className="text-white font-medium">Director:</span>{" "}
                {director.name}
              </p>
            )}

            <div className="flex flex-wrap justify-center sm:justify-start gap-3">
              {trailer && (
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowTrailer(true)}
                  className="flex items-center gap-2 bg-cine-accent hover:bg-cine-accent-light transition-colors font-semibold px-6 py-3 rounded-lg text-sm sm:text-base"
                >
                  <Play size={18} fill="white" />
                  Watch Trailer
                </motion.button>
              )}

              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => toggleWatchlist(movie)}
                className={`flex items-center gap-2 font-semibold px-6 py-3 rounded-lg transition-colors text-sm sm:text-base ${
                  inWatchlist
                    ? "bg-white text-black"
                    : "bg-white/10 hover:bg-white/20"
                }`}
              >
                {inWatchlist ? (
                  <>
                    <BookmarkCheck size={18} /> In Watchlist
                  </>
                ) : (
                  <>
                    <Bookmark size={18} /> Add to Watchlist
                  </>
                )}
              </motion.button>
            </div>
          </motion.div>
        </div>

        {/* Cast */}
        {cast.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-4">Cast</h2>
            <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-2">
              {cast.map((person) => (
                <div key={person.id} className="w-24 sm:w-28 shrink-0 text-center">
                  <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden bg-cine-card mx-auto mb-2">
                    {person.profile_path ? (
                      <img
                        src={getImageUrl(person.profile_path, "w200")}
                        alt={person.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-cine-text-muted text-xs">
                        No Photo
                      </div>
                    )}
                  </div>
                  <p className="text-xs font-medium line-clamp-1">{person.name}</p>
                  <p className="text-xs text-cine-text-muted line-clamp-1">
                    {person.character}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Trailer Modal */}
      {showTrailer && trailer && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setShowTrailer(false)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="relative w-full max-w-3xl aspect-video"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowTrailer(false)}
              className="absolute -top-10 right-0 text-white hover:text-cine-accent"
            >
              <X size={28} />
            </button>
            <iframe
              width="100%"
              height="100%"
              src={`https://www.youtube.com/embed/${trailer.key}?autoplay=1`}
              title="Trailer"
              allow="autoplay; encrypted-media"
              allowFullScreen
              className="rounded-lg"
            />
          </motion.div>
        </div>
      )}
    </div>
  );
}

export default MovieDetail;