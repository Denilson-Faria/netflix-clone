import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import MovieCard from '../components/MovieCard';
import MovieModal from '../components/MovieModal';
import { tmdbApi } from '../services/tmdbApi';

function Search() {
  const [searchParams] = useSearchParams();
  const [results, setResults] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const query = searchParams.get('q');

  useEffect(() => {
    if (query) {
      searchMovies();
    }
  }, [query]);

  const searchMovies = async () => {
    const data = await tmdbApi.searchMovies(query);
    setResults(data);
  };

  return (
    <div className="min-h-screen bg-netflix-black">
      <Navbar />
      
      <div className="pt-24 px-4 md:px-16">
        <h1 className="text-3xl font-bold mb-8">
          Resultados para "{query}"
        </h1>

        {results.length === 0 ? (
          <p className="text-gray-400 text-lg">
            Nenhum resultado encontrado.
          </p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {results.map((movie) => (
              <MovieCard
                key={movie.id}
                movie={movie}
                onClick={setSelectedMovie}
              />
            ))}
          </div>
        )}
      </div>

      {selectedMovie && (
        <MovieModal
          movie={selectedMovie}
          onClose={() => setSelectedMovie(null)}
        />
      )}
    </div>
  );
}

export default Search;