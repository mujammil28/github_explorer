import axios from 'axios';
import db from './db.js';

// Save friendship
export function saveFriendship(userA, userB) {
  db.run(
    `INSERT OR IGNORE INTO friends (user1, user2) VALUES (?, ?)`,
    [userA, userB],
    (err) => {
      if (err) console.error("Error saving friendship:", err.message);
    }
  );
}

// Fetch and store mutual followers
export async function findAndSaveMutualFriends(username) {
  try {
    const [followersRes, followingRes] = await Promise.all([
      axios.get(`https://api.github.com/users/${username}/followers`),
      axios.get(`https://api.github.com/users/${username}/following`)
    ]);

    const followers = followersRes.data.map(f => f.login);
    const following = followingRes.data.map(f => f.login);

    const mutuals = followers.filter(user => following.includes(user));

    mutuals.forEach(friend => {
      saveFriendship(username, friend);
      saveFriendship(friend, username); // Bidirectional
    });

    return mutuals;
  } catch (err) {
    console.error("Error fetching mutuals:", err.message);
    return [];
  }
}
