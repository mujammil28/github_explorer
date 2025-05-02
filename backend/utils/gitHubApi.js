import axios from 'axios';

export const getUserFromGitHub = async (username) => {
  const res = await axios.get(`https://api.github.com/users/${username}`);
  console.log('res data::::::',res.data)
  
  return res.data;
};

export const getFollowers = async (username) => {
  const res = await axios.get(`https://api.github.com/users/${username}/followers`);
  return res.data.map(user => user.login);
};

export const getFollowing = async (username) => {
  const res = await axios.get(`https://api.github.com/users/${username}/following`);
  return res.data.map(user => user.login);
};
