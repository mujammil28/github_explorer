import React, { useState } from 'react';
import { fetchGitHubData } from './configureFile/api';
import UserCard from './components/userCard';
import RepoList from './components/repoList';

function App() { 
  const [username, setUsername] = useState('');
  const [data, setData] = useState(null);
  const [error, setError] = useState('');

  const handleSearch = async () => {
    try {
      setError('');
      const result = await fetchGitHubData(username);
      setData(result);
    } catch (err) {
      setError(err.message);
      setData(null);
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>GitHub Explorer</h1>
      <input
        type="text"
        value={username}
        placeholder="Enter GitHub username"
        onChange={(e) => setUsername(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {data && (
        <>
          <UserCard user={data.user} />
          <h3>Repositories:</h3>
          <RepoList repos={data.repos} />
        </>
      )}
    </div>
  );
}

export default App;
