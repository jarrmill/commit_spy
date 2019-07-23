import React from 'react'
import PropTypes from 'prop-types';
import CommitEntry from './commit_entry';
import RepoHeader from './repo_header';
import Container from '@material-ui/core/Container';

const RepoEntry = props => {
  const { repo, id } = props;
  const organization = props.repo[0].html_url.split('/')[3];
  const repository = props.repo[0].html_url.split('/')[4]
  const style = {
    margin: '0px',
  }
  const commits = props.repo.map((commit, i) => <CommitEntry key={`commit-${id}-${i}`} commit={commit}/>)
  return (
    <Container style={style}>
      <RepoHeader organization={organization} repository={repository}/>
      {commits}
    </Container>
  )
}

RepoEntry.propTypes = {
  repo: PropTypes.array.isRequired,
  id: PropTypes.number
}
export default RepoEntry