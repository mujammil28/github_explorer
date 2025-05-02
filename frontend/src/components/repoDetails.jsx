import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const RepoDetails = () => {
  const { username } = useParams();
  const [repos, setRepos] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserAndRepos = async () => {
      try {
        const [userRes, reposRes] = await Promise.all([
          axios.get(`http://localhost:5000/api/users/${username}`),
          axios.get(`http://localhost:5000/api/users/${username}/repos`)
        ]);

        setUser(userRes.data);
        setRepos(reposRes.data.repos || []);
      } catch (error) {
        console.error('Error fetching user or repositories:', error);
      }
    };

    fetchUserAndRepos();
  }, [username]);

  if (!user) return <p>Loading user data...</p>;

  return (
    <div>
      <button onClick={() => window.history.back()}>🔙 Back</button>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
        <img src={user.avatar_url} alt="avatar" width={100} style={{ borderRadius: '50%', marginRight: '1rem' }} />
        <div>
          <h2>{user.name || user.username}</h2>
          <p>{user.bio}</p>
          <p>Location: {user.location}</p>
          <p>Followers: {user.followers}</p>
          <a href={user.html_url} target="_blank" rel="noopener noreferrer">View GitHub Profile</a>
        </div>
      </div>

      <h3>Repositories</h3>
      {repos.length === 0 ? (
        <p>No repositories found.</p>
      ) : (
        <ul>
          {repos.map((repo) => (
            <li key={repo.id}>
              <strong>{repo.name}</strong>: {repo.description || 'No description'}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default RepoDetails;
