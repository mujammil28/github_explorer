import React, { useState } from 'react';
import { fetchUser, fetchRepos, sortUsers } from '../api';
import SearchBar from './searchBar';
import UserCard from './userCard';
import RepoList from './repoList';

const Home = () => {
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [repos, setRepos] = useState([]);

  const handleSearch = async (username) => {
    try {
      const userData = await fetchUser(username);
      setUser(userData);
      setUsers([]);

      // Fetch repositories for the user
      const userRepos = await fetchRepos(username);
      setRepos(userRepos);
    } catch (err) {
      setUser(null);
      setRepos([]); // Clear repos if user is not found
      alert('User not found');
    }
  };

  const handleSort = async (field) => {
    try {
      const sortedData = await sortUsers(field);
      setUsers(sortedData);
      setUser(null);
      setRepos([]); // Clear repos when sorting users
    } catch (err) {
      console.error('Error sorting users:', err);
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>GitHub User Explorer</h1>
      <SearchBar onSearch={handleSearch} />
      <button onClick={() => handleSort('followers')} style={{ marginRight: '1rem' }}>
        Sort by Followers
      </button>
      <button onClick={() => handleSort('public_repos')}>Sort by Repositories</button>

      {user && <UserCard user={user} />}

      {users.length > 0 && (
        <div style={{ marginTop: '2rem' }}>
          <h2>Sorted Users</h2>
          {users.map((u) => (
            <UserCard key={u.id} user={u} />
          ))}
        </div>
      )}

      {repos.length > 0 && (
        <div style={{ marginTop: '2rem' }}>
          <h2>Repositories</h2>
          <RepoList repos={repos} onRepoClick={(repo) => console.log('Repo clicked:', repo)} />
        </div>
      )}
    </div>
  );
};

export default Home;                                                                