import axios from 'axios';

const BASE_URL = 'http://localhost:5000/api';

export const fetchUser = async (username) => {
  try {
    const res = await axios.get(`${BASE_URL}/users/${username}`);
    return res.data;
  } catch (error) {
    console.error('Error fetching user:', error);
    throw error;
  }
};

export const fetchRepos = async (username) => {
  return await axios.get(`https://api.github.com/users/${username}/repos`);
};

export const sortUsers = async (field) => {
  const res = await axios.get(`${BASE_URL}/users/sort/by?sortBy=${field}`);
  return res.data;
};

export const fetchFollowers = async (username) => {
  const response = await fetch(`${BASE_URL}/users/${username}/friends`);
  if (!response.ok) throw new Error('Failed to fetch followers');
  return await response.json();
};