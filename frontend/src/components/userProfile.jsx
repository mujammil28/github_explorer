import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import '../styles/UserProfile.css';

const UserProfile = () => {
  const { username } = useParams();
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  const goToRepos = () => {
    navigate(`/repos/${username}`);
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/users/${username}`);
        setUserData(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, [username]);

  if (!userData) return <div className="loading">Loading...</div>;

  return (
    <div className="user-profile-container">
      <div className="user-profile-left">
        <img
          src={userData.avatar_url}
          alt={userData.name}
          className="user-profile-avatar"
        />
        <div className="user-profile-verified">Verified GitHub User</div>
        <div className="user-tags">
          <span className="user-tag">Repos: {userData.public_repos}</span>
          <span className="user-tag">Followers: {userData.followers}</span>
          <span className="user-tag">Following: {userData.following}</span>
        </div>
      </div>

      <div className="user-profile-right">
        <button
          className="back-button"
          onClick={() => window.location.href = '/'}
        >
        Back
        </button>

        <h2 className="user-name">{userData.name || userData.login}</h2>
        <p className="user-bio">{userData.bio || 'No bio available.'}</p>
        <p><strong>Location:</strong> {userData.location || 'Not specified'}</p>
        <p><strong>Company:</strong> {userData.company || 'N/A'}</p>
        <p><strong>Blog:</strong> {
          userData.blog ? (
            <a href={userData.blog} target="_blank" rel="noopener noreferrer">
              {userData.blog}
            </a>
          ) : 'N/A'
        }</p>

        <div className="user-actions">
          <button onClick={goToRepos} className="user-action">View Repositories</button>
          <a
            href={userData.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="user-link"
          >
            Visit GitHub Profile
          </a>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
