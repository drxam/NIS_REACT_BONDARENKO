import { useState } from 'react';
import { initialMovies } from './data/movies.ts';
import { FilterMode, ViewMode } from './types/movie.ts';
import { FilterButtons } from './components/FilterButtons.tsx';
import { SearchBar } from './components/SearchBar.tsx';
import { MovieList } from './components/MovieList.tsx';
import './App.css';

function App() {
    const [movies, setMovies] = useState(initialMovies);
    const [filterMode, setFilterMode] = useState<FilterMode>('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [viewMode, setViewMode] = useState<ViewMode>('grid');

    const toggleFavorite = (id: number) => {
        setMovies((prevMovies) =>
            prevMovies.map((movie) =>
                movie.id === id ? { ...movie, isFavorite: !movie.isFavorite } : movie
            )
        );
    };

    const getFilteredMovies = () => {
        let filtered = movies;

        if (filterMode === 'favorites') {
            filtered = filtered.filter((movie) => movie.isFavorite);
        }

        if (searchQuery.trim()) {
            filtered = filtered.filter((movie) =>
                movie.title.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        return filtered;
    };

    const filteredMovies = getFilteredMovies();

    return (
        <div className="app">
            <header className="app-header">
                <h1>Мои фильмы</h1>
            </header>

            <div className="controls">
                <FilterButtons currentFilter={filterMode} onFilterChange={setFilterMode} />

                <SearchBar onSearch={setSearchQuery} />

                <div className="view-mode-toggle">
                    <button
                        className={viewMode === 'grid' ? 'active' : ''}
                        onClick={() => setViewMode('grid')}
                    >
                        Плитка
                    </button>
                    <button
                        className={viewMode === 'list' ? 'active' : ''}
                        onClick={() => setViewMode('list')}
                    >
                        Список
                    </button>
                </div>
            </div>

            <MovieList
                movies={filteredMovies}
                onToggleFavorite={toggleFavorite}
                viewMode={viewMode}
            />
        </div>
    );
}

export default App;