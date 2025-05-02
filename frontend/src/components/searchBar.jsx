import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
  const [username, setUsername] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username.trim()) {
      onSearch(username.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '1rem' }}>
      <input
        type="text"
        value={username}
        placeholder="Enter GitHub username"
        onChange={(e) => setUsername(e.target.value)}
        style={{ padding: '0.5rem', width: '200px' }}
      />
      <button type="submit" style={{ padding: '0.5rem', marginLeft: '0.5rem' }}>
        Search
      </button>
    </form>
  );
};

export default SearchBar;
