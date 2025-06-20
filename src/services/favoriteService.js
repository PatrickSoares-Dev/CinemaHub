const FAVORITES_KEY = 'cinemaHubFavorites';

export const getFavorites = () => {
  const stored = localStorage.getItem(FAVORITES_KEY);
  return stored ? JSON.parse(stored) : [];
};

export const isFavorite = (movieId) => {
  const favorites = getFavorites();
  return favorites.includes(movieId);
};

export const addFavorite = (movieId) => {
  const favorites = getFavorites();
  if (!favorites.includes(movieId)) {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify([...favorites, movieId]));
  }
};

export const removeFavorite = (movieId) => {
  const favorites = getFavorites();
  const updated = favorites.filter((id) => id !== movieId);
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(updated));
};

export const toggleFavorite = (movieId) => {
  if (isFavorite(movieId)) {
    removeFavorite(movieId);
  } else {
    addFavorite(movieId);
  }
};
