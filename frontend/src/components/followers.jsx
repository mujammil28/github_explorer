import React, { useState, useEffect } from 'react';
import { fetchFollowers } from '../api';
import '../styles/FollowersPage.css'; // ✅ Import the CSS

const FollowersPage = ({ username, onUserClick }) => {
  const [followers, setFollowers] = useState([]);

  useEffect(() => {
    const getFollowers = async () => {
      try {
        const data = await fetchFollowers(username);
        setFollowers(data.friends || []); // Adjust based on your backend response shape
      } catch (err) {
        console.error('Error fetching followers:', err);
      }
    };

    getFollowers();
  }, [username]);

  if (followers.length === 0)
    return <div className="no-followers">No followers found.</div>;

  return (
    <div className="followers-container">
      <h2 className="followers-header">Followers of {username}</h2>
      <ul className="followers-list">
        {followers.map((follower, index) => (
          <li
            key={index}
            className="followers-list-item"
            onClick={() => onUserClick(follower)}
          >
            {follower}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FollowersPage;
