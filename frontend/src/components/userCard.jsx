import React from 'react';

const UserCard = ({ user }) => (
  <div>
    <img src={user.avatar_url} alt="avatar" width={100} />
    <h2>{user.name}</h2>
    <p>{user.bio}</p>
    <a href={user.html_url} target="_blank" rel="noreferrer">GitHub Profile</a>
  </div>
);

export default UserCard;
