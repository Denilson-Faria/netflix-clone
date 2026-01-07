import { tmdbApi } from '../services/tmdbApi';

function MovieCard({ movie, onClick }) {
  const title = movie.title || movie.name;
  const posterPath = movie.poster_path || movie.backdrop_path;

  return (
    <div 
      onClick={() => onClick(movie)}
      className="min-w-[150px] md:min-w-[200px] cursor-pointer transform transition-all duration-300 hover:scale-110 hover:z-10 group"
    >
      <div className="relative overflow-hidden rounded-md">
        <img
          src={tmdbApi.getImageUrl(posterPath, 'w500')}
          alt={title}
          className="w-full rounded-md transition-transform duration-300 group-hover:brightness-75"
          loading="lazy"
        />
        
        {/* Overlay no hover */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
          <div className="text-center px-2">
            <p className="text-white text-sm font-semibold line-clamp-2">
              {title}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieCard;