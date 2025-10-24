import { useRef } from 'react';

interface SearchBarProps {
    onSearch: (query: string) => void;
}

export const SearchBar = ({ onSearch }: SearchBarProps) => {
    const searchInputRef = useRef<HTMLInputElement>(null);

    const handleSearch = () => {
        if (searchInputRef.current) {
            onSearch(searchInputRef.current.value);
        }
    };

    return (
        <div className="search-bar">
            <input
                ref={searchInputRef}
                type="text"
                placeholder="Поиск по названию..."
                onChange={handleSearch}
                className="search-input"
            />
        </div>
    );
};