// src/components/repoList.jsx
import React from 'react';

const RepoList = ({ repos, onRepoClick }) => {
  return (
    <div>
      <h3>Repositories:</h3>
      {repos.map((repo) => (
        <div key={repo.id} style={{ border: '1px solid #ccc', padding: '10px', margin: '10px' }} onClick={() => onRepoClick(repo)}>
          <strong>{repo.name}</strong> -  {repo.stargazers_count}
        </div>
      ))}
    </div>
  );
};

export default RepoList;
