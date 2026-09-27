import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, Bookmark, Film } from "lucide-react";
import { motion } from "framer-motion";

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query)}`);
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-cine-darker/90 backdrop-blur-md shadow-lg shadow-black/50"
          : "bg-linear-to-b from-black/80 to-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between gap-6">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <Film className="text-cine-accent" size={28} />
          <span className="text-xl font-bold tracking-wide">
            Cine<span className="text-cine-accent">Vault</span>
          </span>
        </Link>

        {/* Search Bar */}
        <form
          onSubmit={handleSearch}
          className="flex-1 max-w-md relative hidden sm:block"
        >
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search movies..."
            className="w-full bg-cine-card/70 border border-white/10 rounded-full py-2 pl-10 pr-4 text-sm text-white placeholder-cine-text-muted focus:outline-none focus:ring-2 focus:ring-cine-accent transition-all"
          />
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-cine-text-muted"
          />
        </form>

        {/* Watchlist Link */}
        <motion.div whileTap={{ scale: 0.9 }}>
          <Link
            to="/watchlist"
            className="flex items-center gap-2 text-sm font-medium hover:text-cine-accent transition-colors"
          >
            <Bookmark size={20} />
            <span className="hidden md:inline">Watchlist</span>
          </Link>
        </motion.div>
      </div>
    </nav>
  );
}

export default Navbar;