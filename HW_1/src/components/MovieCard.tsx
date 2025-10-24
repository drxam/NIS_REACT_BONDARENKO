import { Movie, ViewMode } from '../types/movie.ts';

interface MovieCardProps {
    movie: Movie;
    onToggleFavorite: (id: number) => void;
    viewMode: ViewMode;
}

export const MovieCard = ({ movie, onToggleFavorite, viewMode }: MovieCardProps) => {
    const cardClass = viewMode === 'grid' ? 'movie-card-grid' : 'movie-card-list';

    return (
        <div className={cardClass}>
            <img src={movie.posterUrl} alt={movie.title} className="movie-poster" />
            <div className="movie-info">
                <h3 className="movie-title">{movie.title}</h3>
                <p className="movie-year">{movie.year}</p>
                <button
                    className={`favorite-btn ${movie.isFavorite ? 'active' : ''}`}
                    onClick={() => onToggleFavorite(movie.id)}
                >
                    ⭐ {movie.isFavorite ? 'В избранном' : 'Добавить в избранное'}
                </button>
            </div>
        </div>
    );
};