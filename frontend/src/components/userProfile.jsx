import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

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

  if (!userData) return <div>Loading...</div>;

  return (
    <div>
      <button onClick={() => window.location.href = '/'}>🔙 Back to Search</button>
      <h2>{userData.name}</h2>
      <img src={userData.avatar_url} alt={userData.name} width={100} />
      <p>{userData.bio}</p>
      <p>{userData.location}</p>
      <div style={{ marginTop: '10px' }}>
        <button onClick={goToRepos}>View Repositories</button>
        <a 
          href={userData.html_url} 
          target="_blank" 
          rel="noopener noreferrer"
          style={{ marginLeft: '10px' }}
        >
          Visit GitHub Profile
        </a>
      </div>
    </div>
  );
};

export default UserProfile;
