import React, { useState, useEffect } from 'react';
import { fetchFollowers } from '../api';

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

  if (followers.length === 0) return <div>No followers found.</div>;

  return (
    <div style={{ padding: '1rem' }}>
      <h2>Followers of {username}</h2>
      <ul>
        {followers.map((follower, index) => (
          <li key={index} style={{ cursor: 'pointer', margin: '10px 0' }}
              onClick={() => onUserClick(follower)}>
            {follower}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FollowersPage;
