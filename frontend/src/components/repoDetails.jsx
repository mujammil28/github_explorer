import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../styles/RepoDetails.css';

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
    <div className="repo-container">
      <button className="back-button" onClick={() => window.history.back()}>Back</button>
      <div className="user-info">
        <img src={user.avatar_url} alt="avatar" width={100} />
        <div>
          <h2>{user.name || user.username}</h2>
          <p>{user.bio}</p>
          <p>Location: {user.location}</p>
          <p>Followers: {user.followers}</p>
          <a href={user.html_url} target="_blank" rel="noopener noreferrer">View GitHub Profile</a>
        </div>
      </div>
  
      <div className="repo-section">
        <h3>Repositories</h3>
        {repos.length === 0 ? (
          <p>No repositories found.</p>
        ) : (
          <ul>
             {repos.map((repo) => (
    <li key={repo.id} className="repo-card">
      <div className="repo-avatar">
        {/* Placeholder or logic for language logo if available */}
        <img src="https://avatars.githubusercontent.com/u/9919?s=40" alt="repo icon" style={{ borderRadius: '50%' }} />
      </div>
      <div className="repo-content">
        <a href={repo.html_url} target="_blank" rel="noopener noreferrer" className="repo-title">
          {repo.name} <img src="https://img.icons8.com/color/16/000000/verified-account.png" alt="verified" style={{ marginLeft: 6 }} />
        </a>
        <p className="repo-description">{repo.description || 'No description'}</p>
      </div>
    </li>
  ))}
          </ul>
        )}
      </div>
    </div>
  );
  
};

export default RepoDetails;
