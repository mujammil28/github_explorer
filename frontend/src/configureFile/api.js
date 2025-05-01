export const fetchGitHubData = async (username) => {
    const response = await fetch(`http://localhost:5000/api/users/${username}`);
    if (!response.ok) throw new Error('User not found');
    return await response.json();
  };