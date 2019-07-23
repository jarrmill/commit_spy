import React from 'react'
import PropTypes from 'prop-types';
import CommitEntry from './commit_entry';
import RepoHeader from './repo_header';

const RepoEntry = props => {
  const { repo, id, limit } = props;
  const organization = repo[0].html_url.split('/')[3];
  const repository = repo[0].html_url.split('/')[4]
  const commits = repo.map((commit, i) => {
    return (i < limit) ? <CommitEntry key={`commit-${id}-${i}`} commit={commit}/> : null;
  })
  return (
    <div>
      <RepoHeader organization={organization} repository={repository}/>
      {commits}
    </div>
  )
}

RepoEntry.propTypes = {
  repo: PropTypes.array.isRequired,
  id: PropTypes.number
}
export default RepoEntry