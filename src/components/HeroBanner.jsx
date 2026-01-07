import { useState, useEffect } from 'react';
import { Play, Info } from 'lucide-react';
import { tmdbApi } from '../services/tmdbApi';

function HeroBanner({ onMovieClick }) {
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    loadFeaturedMovie();
  }, []);

  const loadFeaturedMovie = async () => {
    const trending = await tmdbApi.getTrending();
    const randomMovie = trending[Math.floor(Math.random() * trending.length)];
    setMovie(randomMovie);
  };

  if (!movie) {
    return (
      <div className="relative h-[50vh] md:h-[70vh] bg-netflix-black animate-pulse">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-netflix-black" />
      </div>
    );
  }

  const title = movie.title || movie.name;
  const description = movie.overview;

  return (
    <div className="relative h-[50vh] md:h-[70vh] w-full">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={tmdbApi.getImageUrl(movie.backdrop_path)}
          alt={title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-netflix-black via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="relative h-full flex items-center px-4 md:px-16">
        <div className="max-w-xl md:max-w-2xl">
          <h1 className="text-2xl md:text-6xl font-bold mb-2 md:mb-4">
            {title}
          </h1>
          
          <p className="text-xs md:text-lg mb-4 md:mb-6 line-clamp-2 md:line-clamp-3">
            {description}
          </p>

          <div className="flex gap-2 md:gap-4">
            <button className="flex items-center gap-1 md:gap-2 bg-white text-black px-4 md:px-6 py-1 md:py-2 rounded hover:bg-gray-200 transition font-semibold text-sm md:text-base">
              <Play size={20} fill="black" />
              Assistir
            </button>
            
            <button 
              onClick={() => onMovieClick(movie)}
              className="flex items-center gap-1 md:gap-2 bg-gray-500/70 text-white px-4 md:px-6 py-1 md:py-2 rounded hover:bg-gray-500/50 transition font-semibold text-sm md:text-base"
            >
              <Info size={20} />
              <span className="hidden md:inline">Mais informações</span>
              <span className="md:hidden">Info</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeroBanner;