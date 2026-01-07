import { useState } from 'react';
import Navbar from '../components/Navbar';
import HeroBanner from '../components/HeroBanner';
import MovieRow from '../components/MovieRow';
import MovieModal from '../components/MovieModal';
import { tmdbApi } from '../services/tmdbApi';
import { useFavorites } from '../context/FavoritesContext';

function Home() {
  const [selectedMovie, setSelectedMovie] = useState(null);
  const { favorites } = useFavorites();

  const handleMovieClick = (movie) => {
    setSelectedMovie(movie);
  };

  const handleCloseModal = () => {
    setSelectedMovie(null);
  };

  return (
    <div className="min-h-screen bg-netflix-black">
      <Navbar />
      
      <HeroBanner onMovieClick={handleMovieClick} />

      <div className="relative -mt-32 z-10">
        <MovieRow
          title="Em Alta"
          fetchMovies={tmdbApi.getTrending}
          onMovieClick={handleMovieClick}
        />

        <MovieRow
          title="Populares"
          fetchMovies={tmdbApi.getPopular}
          onMovieClick={handleMovieClick}
        />

        <MovieRow
          title="Mais Votados"
          fetchMovies={tmdbApi.getTopRated}
          onMovieClick={handleMovieClick}
        />

        <MovieRow
          title="Ação"
          fetchMovies={tmdbApi.getActionMovies}
          onMovieClick={handleMovieClick}
        />

        <MovieRow
          title="Comédia"
          fetchMovies={tmdbApi.getComedies}
          onMovieClick={handleMovieClick}
        />

        <MovieRow
          title="Terror"
          fetchMovies={tmdbApi.getHorror}
          onMovieClick={handleMovieClick}
        />

        <MovieRow
          title="Romance"
          fetchMovies={tmdbApi.getRomance}
          onMovieClick={handleMovieClick}
        />

        <MovieRow
          title="Documentários"
          fetchMovies={tmdbApi.getDocumentaries}
          onMovieClick={handleMovieClick}
        />

        {favorites.length > 0 && (
          <MovieRow
            title="Minha Lista"
            fetchMovies={() => Promise.resolve(favorites)}
            onMovieClick={handleMovieClick}
          />
        )}
      </div>

      {selectedMovie && (
        <MovieModal
          movie={selectedMovie}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
}

export default Home;