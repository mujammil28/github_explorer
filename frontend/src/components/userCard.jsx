import React from 'react';
import { Link } from 'react-router-dom';

const UserCard = ({ user }) => {
  if (!user || !user.avatar_url) return <div>No user data available</div>;

  const username = user.username || user.login; // handle GitHub API field

  return (
    <div className="user-card">
      <img src={user.avatar_url} alt="avatar" />
      <div>
        <h2>{user.name || username}</h2>
        <p>{user.bio}</p>
        <p>Location: {user.location}</p>
        <Link to={`/repos/${username}`}>View Profile</Link><br />
        <Link to={`/followers/${username}`}>View Mutual Friends</Link>
      </div>
    </div>
  );
};

export default UserCard;
