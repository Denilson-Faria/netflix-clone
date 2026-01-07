import axios from 'axios';

const API_KEY = '4e9f453b23fb12e7bf1346d9bc9b0b96';
const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p';

const api = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
    language: 'pt-BR'
  }
});

export const tmdbApi = {
  // Filmes em alta
  getTrending: async () => {
    const response = await api.get('/trending/all/week');
    return response.data.results;
  },

  // Filmes populares
  getPopular: async () => {
    const response = await api.get('/movie/popular');
    return response.data.results;
  },

  // Top rated
  getTopRated: async () => {
    const response = await api.get('/movie/top_rated');
    return response.data.results;
  },

  // Filmes de ação
  getActionMovies: async () => {
    const response = await api.get('/discover/movie', {
      params: { with_genres: 28 }
    });
    return response.data.results;
  },

  // Comédias
  getComedies: async () => {
    const response = await api.get('/discover/movie', {
      params: { with_genres: 35 }
    });
    return response.data.results;
  },

  // Terror
  getHorror: async () => {
    const response = await api.get('/discover/movie', {
      params: { with_genres: 27 }
    });
    return response.data.results;
  },

  // Romances
  getRomance: async () => {
    const response = await api.get('/discover/movie', {
      params: { with_genres: 10749 }
    });
    return response.data.results;
  },

  // Documentários
  getDocumentaries: async () => {
    const response = await api.get('/discover/movie', {
      params: { with_genres: 99 }
    });
    return response.data.results;
  },

  // Detalhes do filme
  getMovieDetails: async (id) => {
    const response = await api.get(`/movie/${id}`, {
      params: {
        append_to_response: 'videos,credits'
      }
    });
    return response.data;
  },

  // Buscar filmes
  searchMovies: async (query) => {
    const response = await api.get('/search/multi', {
      params: { query }
    });
    return response.data.results;
  },

  // Helper para URLs de imagens
  getImageUrl: (path, size = 'original') => {
    if (!path) return 'https://via.placeholder.com/500x750?text=No+Image';
    return `${IMAGE_BASE_URL}/${size}${path}`;
  },

  // Helper para trailer do YouTube
  getTrailerKey: (videos) => {
    if (!videos || !videos.results) return null;
    const trailer = videos.results.find(
      video => video.type === 'Trailer' && video.site === 'YouTube'
    );
    return trailer ? trailer.key : null;
  }
};