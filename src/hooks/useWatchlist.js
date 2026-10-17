import { useContext } from "react";
import { WatchlistContext } from "../context/watchlistContext";

export function useWatchlist() {
  const context = useContext(WatchlistContext);
  if (!context) {
    throw new Error("useWatchlist must be used inside WatchlistProvider");
  }
  return context;
}