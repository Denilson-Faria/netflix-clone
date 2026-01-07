import { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import MovieCard from './MovieCard';
import SkeletonCard from './SkeletonCard';

function MovieRow({ title, fetchMovies, onMovieClick }) {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [showLeftButton, setShowLeftButton] = useState(false);
  const [showRightButton, setShowRightButton] = useState(true);
  const rowRef = useRef(null);
  const loadMoreRef = useRef(null);

  useEffect(() => {
    loadMovies(1);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loadingMore) {
          loadMoreMovies();
        }
      },
      { threshold: 0.5 }
    );

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }

    return () => {
      if (loadMoreRef.current) {
        observer.unobserve(loadMoreRef.current);
      }
    };
  }, [hasMore, loadingMore, page]);

  const loadMovies = async (pageNum) => {
    try {
      if (pageNum === 1) {
        setLoading(true);
      } else {
        setLoadingMore(true);
      }
      
      const data = await fetchMovies(pageNum);
      
      if (pageNum === 1) {
        setMovies(data);
      } else {
        setMovies(prev => [...prev, ...data]);
      }

      if (data.length < 20) {
        setHasMore(false);
      }
    } catch (error) {
      console.error('Erro ao carregar filmes:', error);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  const loadMoreMovies = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    loadMovies(nextPage);
  };

  const scroll = (direction) => {
    const container = rowRef.current;
    const scrollAmount = container.offsetWidth * 0.8;
    
    if (direction === 'left') {
      container.scrollLeft -= scrollAmount;
    } else {
      container.scrollLeft += scrollAmount;
    }
  };

  const handleScroll = () => {
    const container = rowRef.current;
    setShowLeftButton(container.scrollLeft > 0);
    setShowRightButton(
      container.scrollLeft < container.scrollWidth - container.offsetWidth - 10
    );
  };

  return (
    <div className="px-4 md:px-16 mb-8 relative group">
      <h2 className="text-xl md:text-2xl font-semibold mb-4">
        {title}
      </h2>
      
      <div className="relative">
        {showLeftButton && !loading && (
          <button
            onClick={() => scroll('left')}
            className="absolute left-0 top-0 bottom-0 z-10 bg-black/50 hover:bg-black/80 w-12 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <ChevronLeft size={40} />
          </button>
        )}

        <div
          ref={rowRef}
          onScroll={handleScroll}
          className="flex gap-2 overflow-x-scroll scrollbar-hide scroll-smooth"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {loading ? (
            // Mostrar skeletons enquanto carrega
            Array.from({ length: 10 }).map((_, index) => (
              <SkeletonCard key={index} />
            ))
          ) : (
            <>
              {movies.map((movie, index) => (
                <MovieCard
                  key={`${movie.id}-${index}`}
                  movie={movie}
                  onClick={onMovieClick}
                />
              ))}

              {hasMore && (
                <div ref={loadMoreRef} className="min-w-[200px] flex items-center justify-center">
                  <div className="text-gray-400">
                    {loadingMore ? (
                      <div className="flex flex-col items-center gap-2">
                        <div className="w-8 h-8 border-4 border-gray-600 border-t-white rounded-full animate-spin" />
                        <span className="text-sm">Carregando...</span>
                      </div>
                    ) : (
                      <span className="text-sm">→</span>
                    )}
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {showRightButton && !loading && (
          <button
            onClick={() => scroll('right')}
            className="absolute right-0 top-0 bottom-0 z-10 bg-black/50 hover:bg-black/80 w-12 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <ChevronRight size={40} />
          </button>
        )}
      </div>
    </div>
  );
}

export default MovieRow;