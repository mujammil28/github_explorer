import React from 'react';

const RepoList = ({ repos }) => (
  <ul>
    {repos.map(repo => (
      <li key={repo.id}>
        <a href={repo.html_url} target="_blank" rel="noreferrer">{repo.name}</a>
      </li>
    ))}
  </ul>
);

export default RepoList;
