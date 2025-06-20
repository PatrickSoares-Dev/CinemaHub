import axios from 'axios';

const API_KEY = process.env.REACT_APP_TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

const api = axios.create({
  baseURL: BASE_URL,
  params: { api_key: API_KEY },
  language: 'pt-BR'
});

const handleError = (error, defaultMessage) => {
  console.error(defaultMessage, error);
  return new Error('Erro ao comunicar com o servidor. Tente novamente mais tarde.');
};

export const getPopularMovies = async () => {
  try {
    const { data } = await api.get('/movie/popular');
    if (!data || !data.results) {
      throw new Error('Resposta vazia');
    }
    return data.results;
  } catch (error) {
    throw handleError(error, 'Erro ao buscar filmes populares:');
  }
};

export const getMovieDetails = async (id) => {
  try {
    const { data } = await api.get(`/movie/${id}`);
    if (!data) {
      throw new Error('Resposta vazia');
    }
    return data;
  } catch (error) {
    throw handleError(error, 'Erro ao buscar detalhes do filme:');
  }
};
