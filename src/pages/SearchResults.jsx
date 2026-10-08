import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Search, SearchX } from "lucide-react";
import { searchMovies, discoverByGenre, getGenres } from "../services/tmdb";
import { useDebounce } from "../hooks/useDebounce";
import MovieCard from "../components/MovieCard";
import SkeletonCard from "../components/SkeletonCard";

function SearchResults() {
  const [searchParams, setSearchParams] = useSearchParams();
  const urlQuery = searchParams.get("q") || "";

  const [inputValue, setInputValue] = useState(urlQuery);
  const debouncedValue = useDebounce(inputValue, 500);

  const [results, setResults] = useState([]);
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [loading, setLoading] = useState(true);

  // Navbar se search karne par input ko URL ke sath sync rakho
  useEffect(() => {
    setInputValue(urlQuery);
  }, [urlQuery]);

  // Typing rukne ke baad URL update karo
  useEffect(() => {
    const trimmed = debouncedValue.trim();
    if (trimmed !== urlQuery) {
      setSearchParams(trimmed ? { q: trimmed } : {}, { replace: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedValue]);

  // Genre chips ke liye genres load karo (sirf ek baar)
  useEffect(() => {
    getGenres().then(setGenres).catch(console.error);
  }, []);

  // Results fetch karo: query ho to search, warna genre ke hisaab se browse
  useEffect(() => {
    const fetchResults = async () => {
      setLoading(true);
      try {
        const data = urlQuery
          ? await searchMovies(urlQuery)
          : await discoverByGenre(selectedGenre);
        setResults(data);
      } catch (error) {
        console.error("Error fetching movies:", error);
        setResults([]);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [urlQuery, selectedGenre]);

  // Search ke natayij par genre filter client-side lagao
  const filteredResults =
    urlQuery && selectedGenre
      ? results.filter((m) => m.genre_ids?.includes(selectedGenre))
      : results;

  const selectedGenreName = genres.find((g) => g.id === selectedGenre)?.name;

  return (
    <div className="pt-24 px-6 sm:px-12 pb-16 max-w-6xl mx-auto min-h-screen">
      {/* Live search input */}
      <div className="relative max-w-xl mb-6">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Search movies..."
          className="w-full bg-cine-card border border-white/10 rounded-full py-3 pl-12 pr-4 text-white placeholder-cine-text-muted focus:outline-none focus:ring-2 focus:ring-cine-accent transition-all"
        />
        <Search
          size={20}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-cine-text-muted"
        />
      </div>

      {/* Genre filter chips */}
      <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-2 mb-8">
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={() => setSelectedGenre(null)}
          className={`shrink-0 text-sm px-4 py-2 rounded-full border transition-colors ${
            selectedGenre === null
              ? "bg-cine-accent border-cine-accent text-white"
              : "bg-cine-card border-white/10 text-cine-text-muted hover:text-white"
          }`}
        >
          All
        </motion.button>
        {genres.map((genre) => (
          <motion.button
            key={genre.id}
            whileTap={{ scale: 0.95 }}
            onClick={() => setSelectedGenre(genre.id)}
            className={`shrink-0 text-sm px-4 py-2 rounded-full border transition-colors ${
              selectedGenre === genre.id
                ? "bg-cine-accent border-cine-accent text-white"
                : "bg-cine-card border-white/10 text-cine-text-muted hover:text-white"
            }`}
          >
            {genre.name}
          </motion.button>
        ))}
      </div>

      {/* Heading */}
      <h1 className="text-xl sm:text-2xl font-bold mb-8">
        {urlQuery ? (
          <>
            Search results for{" "}
            <span className="text-cine-accent">"{urlQuery}"</span>
            {selectedGenreName && (
              <span className="text-cine-text-muted text-base">
                {" "}
                in {selectedGenreName}
              </span>
            )}
          </>
        ) : selectedGenreName ? (
          `${selectedGenreName} Movies`
        ) : (
          "Browse Movies"
        )}
      </h1>

      {/* Results */}
      {loading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
          {Array.from({ length: 10 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      ) : filteredResults.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-center justify-center text-center py-20"
        >
          <SearchX size={48} className="text-cine-text-muted mb-4" />
          <p className="text-cine-text-muted">
            {urlQuery
              ? `No results found for "${urlQuery}".`
              : "No movies found."}
          </p>
          <p className="text-cine-text-muted text-sm mt-1">
            Try a different title, spelling, or genre.
          </p>
        </motion.div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
          {filteredResults.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}
    </div>
  );
}

export default SearchResults;