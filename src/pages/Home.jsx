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
import SkeletonCard from "../components/SkeletonCard";

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
      <div className="pt-24 pb-16">
        {/* Skeleton Hero */}
        <div className="h-[70vh] w-full bg-cine-card animate-pulse mb-12" />

        {/* Skeleton Rows */}
        {[1, 2, 3, 4].map((row) => (
          <div key={row} className="mb-10">
            <div className="h-7 w-48 bg-cine-card animate-pulse rounded mb-4 mx-6" />
            <div className="flex gap-4 overflow-x-hidden px-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <SkeletonCard key={i} />
              ))}
            </div>
          </div>
        ))}
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
              className="text-3xl sm:text-5xl lg:text-6xl font-bold mb-4 drop-shadow-lg leading-tight"
            >
              {heroMovie.title}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-cine-text-muted text-sm sm:text-base line-clamp-2 sm:line-clamp-3 mb-6 max-w-lg"
            >
              {heroMovie.overview}
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-wrap gap-3"
            >
              <Link
                to={`/movie/${heroMovie.id}`}
                className="flex items-center gap-2 bg-white text-black font-semibold px-5 sm:px-6 py-2.5 sm:py-3 rounded-lg hover:bg-cine-text-muted transition-colors text-sm sm:text-base"
              >
                <Play size={18} fill="black" />
                View Details
              </Link>
              <Link
                to={`/movie/${heroMovie.id}`}
                className="flex items-center gap-2 bg-white/20 backdrop-blur-sm font-semibold px-5 sm:px-6 py-2.5 sm:py-3 rounded-lg hover:bg-white/30 transition-colors text-sm sm:text-base"
              >
                <Info size={18} />
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