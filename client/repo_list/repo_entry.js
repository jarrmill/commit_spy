import React from 'react'
import PropTypes from 'prop-types';
import CommitEntry from './commit_entry.js';

const RepoEntry = props => {
  const { repo, id } = props;
  return (<div>
    { props.repo.map((commit, i) => <CommitEntry key={`commit-${id}-${i}`} commit={commit.commit}/>)}
  </div>)
}

RepoEntry.propTypes = {
  repo: PropTypes.array.isRequired,
  id: PropTypes.number
}
export default RepoEntry