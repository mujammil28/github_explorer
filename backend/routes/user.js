import express from 'express';
import axios from 'axios';
import { insertOrUpdateUser, getUserByUsername, getSortedUsers,insertMutualFriend } from '../models/userModel.js';

const router = express.Router();

router.get('/users/:username', async (req, res) => {
  const { username } = req.params;

  getUserByUsername(username, async (err, user) => {
    if (user) return res.json(user);

    try {
      const response = await axios.get(`https://api.github.com/users/${username}`);
      const githubUser = response.data;

      insertOrUpdateUser(githubUser, (err) => {
        if (err) return res.status(500).json({ error: 'DB insert failed' });
        res.json({
          ...githubUser,
          username: githubUser.login,
        });
      });
    } catch (error) {
      res.status(500).json({ error: 'GitHub fetch failed' });
    }
  });
});

router.get('/users/:username/friends', async (req, res) => {
  const { username } = req.params;

  try {
    const userFollowersRes = await axios.get(`https://api.github.com/users/${username}/followers`);
    const userFollowingRes = await axios.get(`https://api.github.com/users/${username}/following`);

    const followers = userFollowersRes.data.map(f => f.login);
    const following = userFollowingRes.data.map(f => f.login);

    // Find mutual followers
    const mutuals = followers.filter(f => following.includes(f));

    // Insert each mutual as a friend of username
    mutuals.forEach(friend => {
      insertMutualFriend(username, friend, err => {
        if (err) console.error(`Error inserting friend ${friend} for ${username}:`, err);
      });
    });

    res.json({ username, friends: mutuals });

  } catch (error) {
    console.error('Failed to fetch followers/following:', error.message);
    res.status(500).json({ error: 'GitHub API call failed' });
  }
});

router.get('/users/:username/repos', async (req, res) => {
  const { username } = req.params;

  try {
    const response = await axios.get(`https://api.github.com/users/${username}/repos`);
    const repos = response.data;

    res.json({ repos });
  } catch (error) {
    console.error('Failed to fetch repos:', error.message);
    res.status(500).json({ error: 'Failed to fetch repos from GitHub' });
  }
});

router.get('/users/sort/by', (req, res) => {
  const { sortBy } = req.query;

  getSortedUsers(sortBy, (err, users) => {
    if (err) return res.status(400).json({ error: err.message });
    res.json(users);
  });
});

export default router;
