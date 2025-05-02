import axios from "axios";
export const getUserByUsername = async (req, res) => {
  const { username } = req.params;

  try {
    const response = await axios.get(`https://api.github.com/users/${username}`);
    const data = response.data;

    const user = {
      username: data.login,
      name: data.name,
      avatar_url: data.avatar_url,
      bio: data.bio,
      location: data.location,
      html_url: data.html_url
    };

    res.json(user);
  } catch (error) {
    console.error('GitHub fetch error:', error.message);
    res.status(404).json({ message: 'GitHub user not found' });
  }
};
