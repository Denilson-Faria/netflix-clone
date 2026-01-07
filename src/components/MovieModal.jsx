import { useState, useEffect } from 'react';
import { X, Play, Plus, ThumbsUp, Volume2, VolumeX } from 'lucide-react';
import { tmdbApi } from '../services/tmdbApi';
import { useFavorites } from '../context/FavoritesContext';

function MovieModal({ movie, onClose }) {
  const [details, setDetails] = useState(null);
  const [trailerKey, setTrailerKey] = useState(null);
  const [isMuted, setIsMuted] = useState(true);
  const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites();

  useEffect(() => {
    if (movie) {
      loadMovieDetails();
    }
  }, [movie]);

  const loadMovieDetails = async () => {
    const data = await tmdbApi.getMovieDetails(movie.id);
    setDetails(data);
    const trailer = tmdbApi.getTrailerKey(data.videos);
    setTrailerKey(trailer);
  };

  if (!movie || !details) return null;

  const title = movie.title || movie.name;
  const runtime = details.runtime ? `${Math.floor(details.runtime / 60)}h ${details.runtime % 60}min` : '';
  const releaseYear = new Date(details.release_date || details.first_air_date).getFullYear();
  const genres = details.genres?.map(g => g.name).join(', ');
  const cast = details.credits?.cast?.slice(0, 5).map(c => c.name).join(', ');

  const handleFavoriteToggle = () => {
    if (isFavorite(movie.id)) {
      removeFromFavorites(movie.id);
    } else {
      addToFavorites(movie);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80" onClick={onClose}>
      <div 
        className="relative bg-netflix-black rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 bg-netflix-black rounded-full p-2 hover:bg-gray-800"
        >
          <X size={24} />
        </button>

        {/* Header with Trailer or Image */}
        <div className="relative h-[400px]">
          {trailerKey ? (
            <div className="relative h-full">
              <iframe
                src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1&mute=${isMuted ? 1 : 0}&controls=0&rel=0`}
                className="w-full h-full"
                allow="autoplay; encrypted-media"
                allowFullScreen
              />
              <div className="absolute inset-0 bg-gradient-to-t from-netflix-black via-transparent to-transparent pointer-events-none" />
              
              {/* Mute Button */}
              <button
                onClick={() => setIsMuted(!isMuted)}
                className="absolute bottom-4 right-4 bg-black/50 rounded-full p-3 hover:bg-black/70"
              >
                {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
              </button>
            </div>
          ) : (
            <div className="relative h-full">
              <img
                src={tmdbApi.getImageUrl(movie.backdrop_path || movie.poster_path)}
                alt={title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-netflix-black via-transparent to-transparent" />
            </div>
          )}

          {/* Title and Buttons */}
          <div className="absolute bottom-8 left-8 right-8">
            <h2 className="text-4xl font-bold mb-4">{title}</h2>
            <div className="flex gap-3">
              <button className="flex items-center gap-2 bg-white text-black px-6 py-2 rounded hover:bg-gray-200 transition font-semibold">
                <Play size={24} fill="black" />
                Assistir
              </button>
              
              <button
                onClick={handleFavoriteToggle}
                className={`p-2 rounded-full border-2 border-gray-400 hover:border-white transition ${
                  isFavorite(movie.id) ? 'bg-white text-black' : 'bg-transparent'
                }`}
              >
                <Plus size={24} />
              </button>

              <button className="p-2 rounded-full border-2 border-gray-400 hover:border-white transition">
                <ThumbsUp size={24} />
              </button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Left Column */}
            <div className="md:col-span-2">
              <div className="flex items-center gap-4 mb-4 text-sm">
                <span className="text-green-500 font-semibold">{Math.round(details.vote_average * 10)}% relevante</span>
                <span>{releaseYear}</span>
                {runtime && <span>{runtime}</span>}
                <span className="border border-gray-500 px-2">HD</span>
              </div>

              <p className="text-gray-300 mb-6">
                {details.overview || 'Sem descrição disponível.'}
              </p>
            </div>

            {/* Right Column */}
            <div className="text-sm text-gray-400 space-y-3">
              {cast && (
                <div>
                  <span className="text-gray-500">Elenco: </span>
                  <span className="text-white">{cast}</span>
                </div>
              )}
              
              {genres && (
                <div>
                  <span className="text-gray-500">Gêneros: </span>
                  <span className="text-white">{genres}</span>
                </div>
              )}

              <div>
                <span className="text-gray-500">Avaliação: </span>
                <span className="text-white">⭐ {details.vote_average?.toFixed(1)}/10</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieModal;