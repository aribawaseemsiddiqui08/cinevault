import axios from "axios";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p";

const tmdbClient = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
  },
});

// Poster/backdrop image ka full URL banane ke liye helper
export const getImageUrl = (path, size = "w500") => {
  if (!path) return null;
  return `${IMAGE_BASE_URL}/${size}${path}`;
};

// Trending movies (day/week)
export const getTrending = async (mediaType = "movie", timeWindow = "day") => {
  const res = await tmdbClient.get(`/trending/${mediaType}/${timeWindow}`);
  return res.data.results;
};

// Popular movies
export const getPopular = async () => {
  const res = await tmdbClient.get("/movie/popular");
  return res.data.results;
};

// Top rated movies
export const getTopRated = async () => {
  const res = await tmdbClient.get("/movie/top_rated");
  return res.data.results;
};

// Upcoming movies
export const getUpcoming = async () => {
  const res = await tmdbClient.get("/movie/upcoming");
  return res.data.results;
};

// Search movies by query
export const searchMovies = async (query) => {
  if (!query) return [];
  const res = await tmdbClient.get("/search/movie", {
    params: { query },
  });
  return res.data.results;
};

// Genre ke hisaab se movies (genreId null ho to sirf popular movies)
export const discoverByGenre = async (genreId) => {
  const res = await tmdbClient.get("/discover/movie", {
    params: {
      with_genres: genreId || undefined,
      sort_by: "popularity.desc",
    },
  });
  return res.data.results;
};

// Single movie ki full details
export const getMovieDetails = async (id) => {
  const res = await tmdbClient.get(`/movie/${id}`, {
    params: { append_to_response: "credits,videos" },
  });
  return res.data;
};

// Genre list (filter chips ke liye)
export const getGenres = async () => {
  const res = await tmdbClient.get("/genre/movie/list");
  return res.data.genres;
};

export default tmdbClient;