import React from 'react'
import PropTypes from 'prop-types';
import RepoEntry from './repo_entry';

const RepoList = props => {
  console.log('RepoList props: ', props.repos);
  const { repos } = props;
  return (
    <div>
      { repos.map((repo, i) => <RepoEntry key={`repo-${i}`} id={i} repo={repo} /> )}
    </div>
    )
}

RepoList.propTypes = {
  repos: PropTypes.arrayOf(PropTypes.array).isRequired,
}

export default RepoList