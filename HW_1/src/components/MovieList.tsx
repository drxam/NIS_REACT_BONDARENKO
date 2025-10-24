import { Movie, ViewMode } from '../types/movie.ts';
import { MovieCard } from './MovieCard.tsx';

interface MovieListProps {
    movies: Movie[];
    onToggleFavorite: (id: number) => void;
    viewMode: ViewMode;
}

export const MovieList = ({ movies, onToggleFavorite, viewMode }: MovieListProps) => {
    if (movies.length === 0) {
        return <p className="no-movies">Фильмов нет</p>;
    }

    const containerClass = viewMode === 'grid' ? 'movie-list-grid' : 'movie-list-list';

    return (
        <div className={containerClass}>
            {movies.map((movie) => (
                <MovieCard
                    key={movie.id}
                    movie={movie}
                    onToggleFavorite={onToggleFavorite}
                    viewMode={viewMode}
                />
            ))}
        </div>
    );
};