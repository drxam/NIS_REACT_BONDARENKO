import { FilterMode } from '../types/movie.ts';

interface FilterButtonsProps {
    currentFilter: FilterMode;
    onFilterChange: (filter: FilterMode) => void;
}

export const FilterButtons = ({ currentFilter, onFilterChange }: FilterButtonsProps) => {
    return (
        <div className="filter-buttons">
            <button
                className={currentFilter === 'all' ? 'active' : ''}
                onClick={() => onFilterChange('all')}
            >
                Все
            </button>
            <button
                className={currentFilter === 'favorites' ? 'active' : ''}
                onClick={() => onFilterChange('favorites')}
            >
                Только избранные
            </button>
        </div>
    );
};