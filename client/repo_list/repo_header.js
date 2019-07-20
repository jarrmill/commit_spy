import React from 'react'
import PropTypes from 'prop-types';

const RepoHeader = props => {
  return (
    <div style={{margin: '10px'}}>
      {props.organization} - {props.repository}
    </div>
  );
}

RepoHeader.propTypes = {
  organization: PropTypes.string.isRequired,
  repository: PropTypes.string.isRequired
}
export default RepoHeader