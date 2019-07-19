import React from 'react'
import PropTypes from 'prop-types';

const RepoList = props => {
  console.log('Repo List props: ', props);
  const mapRepos = () => {
    return props.repos.map((repo, i) => {
      const urlArr = repo[0].html_url.split('/');
      const org = urlArr[3]
      const repository = urlArr[4]
      console.log(org, repository);
      return (
        <div>
          <div>{org} - {repository}</div>
          <button onClick={() => props.handleRemoveRepo(org, repository, i)}>Remove</button>
        </div>
      )
    })
  }
  return (
    <div>
      { mapRepos() }
    </div>
  )
}

RepoList.propTypes = {
  repos: PropTypes.arrayOf(PropTypes.object).isRequired
}
export default RepoList;