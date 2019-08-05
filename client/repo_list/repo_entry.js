import React from 'react'
import PropTypes from 'prop-types';
import CommitEntry from './commit_entry';
import RepoHeader from './repo_header';

const RepoEntry = props => {
  const { repo, id, limit } = props;
  const organization = repo[0].html_url.split('/')[3];
  const repository = repo[0].html_url.split('/')[4]
  const commits = repo.map((commit, i) => {
    if(i < limit) {
      if (i === 0) {
        return <CommitEntry key={`commit-${id}-${i}`} isRepeat={false} commit={commit}/>;
      } else if(repo[i - 1].author && commit.author) {
        let isRepeat = (i === 0) ? false : (commit.author.id === repo[i - 1].author.id);
        return <CommitEntry key={`commit-${id}-${i}`} isRepeat={true} commit={commit}/>; 
      }
      else {
        return <CommitEntry key={`commit-${id}-${i}`} isRepeat={false} commit={commit}/>;
      }
    }
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