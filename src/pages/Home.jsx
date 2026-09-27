import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Play, Info } from "lucide-react";
import { Link } from "react-router-dom";
import {
  getTrending,
  getPopular,
  getTopRated,
  getUpcoming,
  getImageUrl,
} from "../services/tmdb";
import MovieRow from "../components/MovieRow";

function Home() {
  const [trending, setTrending] = useState([]);
  const [popular, setPopular] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [heroMovie, setHeroMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const [trendingData, popularData, topRatedData, upcomingData] =
          await Promise.all([
            getTrending("movie", "day"),
            getPopular(),
            getTopRated(),
            getUpcoming(),
          ]);

        setTrending(trendingData);
        setPopular(popularData);
        setTopRated(topRatedData);
        setUpcoming(upcomingData);

        // Random trending movie ko hero banner ke liye choose karo
        if (trendingData.length > 0) {
          const randomIndex = Math.floor(Math.random() * Math.min(5, trendingData.length));
          setHeroMovie(trendingData[randomIndex]);
        }
      } catch (error) {
        console.error("Error fetching movies:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, []);

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

  return (
    <div className="pb-16">
      {/* HERO BANNER */}
      {heroMovie && (
        <div className="relative h-[70vh] w-full mb-12">
          <div className="absolute inset-0">
            <img
              src={getImageUrl(heroMovie.backdrop_path, "original")}
              alt={heroMovie.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-linear-to-t from-cine-dark via-cine-dark/60 to-transparent" />
            <div className="absolute inset-0 bg-linear-to-r from-cine-dark/80 via-transparent to-transparent" />
          </div>

          <div className="relative h-full flex flex-col justify-end px-6 sm:px-12 pb-16 max-w-2xl">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl sm:text-6xl font-bold mb-4 drop-shadow-lg"
            >
              {heroMovie.title}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-cine-text-muted line-clamp-3 mb-6"
            >
              {heroMovie.overview}
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex gap-4"
            >
              <Link
                to={`/movie/${heroMovie.id}`}
                className="flex items-center gap-2 bg-white text-black font-semibold px-6 py-3 rounded-lg hover:bg-cine-text-muted transition-colors"
              >
                <Play size={20} fill="black" />
                View Details
              </Link>
              <Link
                to={`/movie/${heroMovie.id}`}
                className="flex items-center gap-2 bg-white/20 backdrop-blur-sm font-semibold px-6 py-3 rounded-lg hover:bg-white/30 transition-colors"
              >
                <Info size={20} />
                More Info
              </Link>
            </motion.div>
          </div>
        </div>
      )}

      {/* MOVIE ROWS */}
      <MovieRow title="🔥 Trending Today" movies={trending} />
      <MovieRow title="⭐ Popular Movies" movies={popular} />
      <MovieRow title="🏆 Top Rated" movies={topRated} />
      <MovieRow title="🎬 Upcoming" movies={upcoming} />
    </div>
  );
}

export default Home;