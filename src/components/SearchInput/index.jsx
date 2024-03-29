import { useEffect, useState } from 'react';

import styles from './styles.module.scss';

export function SearchInput({ search, setSearch, handleSearch, suggestions = []}) {
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);

  useEffect(() => {
    if (search.length === 0) {
        setFilteredSuggestions([]);
    } else {
        const filtered = suggestions.filter(suggestion =>
            suggestion.toLowerCase().includes(search.toLowerCase())
        );
        setFilteredSuggestions(filtered);
    }
}, [search, suggestions]);

  return (
    <div className={styles.search}>
      <input
        type='text'
        placeholder='Search ...'
        value={search}
        onChange={(event) => setSearch(event.target.value)}
      />
      <button
        className={styles.primary}
        onClick={() => handleSearch()}
      >
        Search
      </button>
      {filteredSuggestions.length > 0 && search && (
        <ul className={styles.suggestions}>
          {filteredSuggestions
            .sort((a, b) => a.length - b.length)
            .filter((suggestion, index) => index < 5)
            .map((suggestion, index) => (
            <li key={index} onClick={() => setSearch(suggestion)}>
              {suggestion}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
