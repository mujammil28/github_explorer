// userModel.js
import db from './db.js';  // use ESM import

await db.run(`CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY,
  username TEXT UNIQUE,
  name TEXT,
  bio TEXT,
  location TEXT,
  blog TEXT,
  avatar_url TEXT,
  html_url TEXT,
  followers INTEGER,
  following INTEGER,
  public_repos INTEGER,
  public_gists INTEGER,
  created_at TEXT,
  deleted INTEGER DEFAULT 0
)`);
await db.run(`
  CREATE TABLE IF NOT EXISTS friends (
    user1 TEXT,
    user2 TEXT,
    PRIMARY KEY (user1, user2)
  )
`);
export const insertMutualFriend = (user1, user2, callback) => {
  const query = `
    INSERT OR IGNORE INTO friends (user1, user2) VALUES (?, ?)
  `;
  db.run(query, [user1, user2], callback);
};

export const insertOrUpdateUser = (user, callback) => {
  const query = `
    INSERT INTO users (id, username, name, bio, location, blog, avatar_url, html_url, followers, following, public_repos, public_gists, created_at, deleted)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 0)
    ON CONFLICT(id) DO UPDATE SET
      username = excluded.username,
      name = excluded.name,
      bio = excluded.bio,
      location = excluded.location,
      blog = excluded.blog,
      avatar_url = excluded.avatar_url,
      html_url = excluded.html_url,
      followers = excluded.followers,
      following = excluded.following,
      public_repos = excluded.public_repos,
      public_gists = excluded.public_gists,
      created_at = excluded.created_at
  `;

    
  const values = [
    user.id, user.login, user.name, user.bio, user.location, user.blog,
    user.avatar_url, user.html_url, user.followers, user.following,
    user.public_repos, user.public_gists, user.created_at
  ];

  db.run(query, values, callback);
};

export const getUserByUsername = (username, callback) => {
  db.get('SELECT * FROM users WHERE username = ? AND deleted = 0', [username], callback);
};

export const getSortedUsers = (field, callback) => {
  const validFields = ['followers', 'public_repos'];
  if (!validFields.includes(field)) return callback(new Error('Invalid field'));

  db.all(`SELECT * FROM users WHERE deleted = 0 ORDER BY ${field} DESC`, [], callback);
};
export const deleteUserByUsername = (username, callback) => {
  db.run('UPDATE users SET deleted = 1 WHERE username = ?', [username], callback);
};
