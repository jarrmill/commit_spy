import React from 'react'
import PropTypes from 'prop-types';
import { RepoName } from './styles';

const RepoHeader = props => {
  return (
    <RepoName>
      {props.organization} - {props.repository}
    </RepoName>
  );
}

RepoHeader.propTypes = {
  organization: PropTypes.string.isRequired,
  repository: PropTypes.string.isRequired
}
export default RepoHeader