import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Film } from "lucide-react";

function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Film size={56} className="text-cine-accent mx-auto mb-4" />
        <h1 className="text-7xl sm:text-8xl font-bold mb-2">404</h1>
        <p className="text-xl font-semibold mb-2">Scene not found</p>
        <p className="text-cine-text-muted mb-8 max-w-md">
          The page you're looking for doesn't exist or may have been moved.
        </p>

        <div className="flex flex-wrap justify-center gap-3">
          <Link
            to="/"
            className="bg-cine-accent hover:bg-cine-accent-light transition-colors font-semibold px-6 py-3 rounded-lg text-sm"
          >
            Back to Home
          </Link>
          <Link
            to="/search"
            className="bg-white/10 hover:bg-white/20 transition-colors font-semibold px-6 py-3 rounded-lg text-sm"
          >
            Browse Movies
          </Link>
        </div>
      </motion.div>
    </div>
  );
}

export default NotFound;