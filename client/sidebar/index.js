import React from 'react'
import PropTypes from 'prop-types';
import List from '@material-ui/core/List';
import { Repo, DeleteButton } from './styles';
const Sidebar = props => {
  const mapRepos = () => {
    console.log('Sidebar props: ', props)
    return props.repos.map((repo, i) => {
      const urlArr = repo[0].html_url.split('/');
      const org = urlArr[3]
      const repository = urlArr[4]
      return (
        <Repo>
          <div style={{marginRight: '10px'}}>>{org} - {repository}</div>
          <DeleteButton
            color="secondary"
            aria-label="Delete"
            size="small"
            onClick={() => props.handleRemoveRepo(org, repository, i)}>
            Remove
          </DeleteButton>
        </Repo>
      )
    })
  }
  return (
    <List>
      { mapRepos() }
    </List>
  )
}

Sidebar.propTypes = {
  repos: PropTypes.arrayOf(PropTypes.object).isRequired,
  handleRemoveRepo: PropTypes.func.isRequired
}
export default Sidebar;