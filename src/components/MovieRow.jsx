import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import MovieCard from "./MovieCard";

function MovieRow({ title, movies }) {
  const rowRef = useRef(null);

  const scroll = (direction) => {
    if (rowRef.current) {
      const scrollAmount = 400;
      rowRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  if (!movies || movies.length === 0) return null;

  return (
    <div className="mb-10 group/row">
      <h2 className="text-xl sm:text-2xl font-bold mb-4 px-6">{title}</h2>

      <div className="relative">
        {/* Left arrow */}
        <button
          onClick={() => scroll("left")}
          className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-black/60 hover:bg-cine-accent rounded-full p-2 opacity-0 group-hover/row:opacity-100 transition-opacity"
        >
          <ChevronLeft size={20} />
        </button>

        {/* Scrollable row */}
        <div
          ref={rowRef}
          className="flex gap-4 overflow-x-auto scrollbar-hide px-6 pb-2"
        >
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>

        {/* Right arrow */}
        <button
          onClick={() => scroll("right")}
          className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-black/60 hover:bg-cine-accent rounded-full p-2 opacity-0 group-hover/row:opacity-100 transition-opacity"
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
}

export default MovieRow;