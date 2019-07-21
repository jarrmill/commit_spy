import React from 'react'
import PropTypes from 'prop-types';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Fab from '@material-ui/core/Fab';
import DeleteIcon from '@material-ui/icons/Delete';

const RepoList = props => {
  console.log('Repo List props: ', props);
  const mapRepos = () => {
    return props.repos.map((repo, i) => {
      const urlArr = repo[0].html_url.split('/');
      const org = urlArr[3]
      const repository = urlArr[4]
      return (
        <ListItem>
          <div style={{marginRight: '10px'}}>{org} - {repository}</div>
          <Fab
            color="secondary"
            aria-label="Delete"
            size="small"
            onClick={() => props.handleRemoveRepo(org, repository, i)}>
            <DeleteIcon />
          </Fab>
        </ListItem>
      )
    })
  }
  return (
    <List>
      { mapRepos() }
    </List>
  )
}

RepoList.propTypes = {
  repos: PropTypes.arrayOf(PropTypes.object).isRequired
}
export default RepoList;