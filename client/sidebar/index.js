import React from 'react'
import PropTypes from 'prop-types';
import { Repo, DeleteButton } from './styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBook } from '@fortawesome/free-solid-svg-icons'

const Sidebar = props => {
  const mapRepos = () => {
    return props.repos.map((repo, i) => {
      const urlArr = repo[0].html_url.split('/');
      const org = urlArr[3]
      const repository = urlArr[4]
      return (
        <Repo>
          <div style={{marginRight: '10px'}}><FontAwesomeIcon icon={faBook} style={{marginRight: '10px'}}/>{org}/{repository}</div>
          
          <DeleteButton
            onClick={() => props.handleRemoveRepo(org, repository, i)}>
            Remove
          </DeleteButton>
        </Repo>
      )
    })
  }
  return (
    <div>
      { mapRepos() }
    </div>
  )
}

Sidebar.propTypes = {
  repos: PropTypes.arrayOf(PropTypes.object).isRequired,
  handleRemoveRepo: PropTypes.func.isRequired
}
export default Sidebar;