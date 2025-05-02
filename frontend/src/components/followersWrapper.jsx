import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import FollowersPage from '../components/followers';

const FollowersWrapper = () => {
  const { username } = useParams();
  const navigate = useNavigate();

  return (
    <FollowersPage
      username={username}
      onUserClick={(clickedUsername) => navigate(`/user/${clickedUsername}`)}
    />
  );
};

export default FollowersWrapper;
