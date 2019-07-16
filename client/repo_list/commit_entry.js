import React from 'react'
import PropTypes from 'prop-types';

const CommitEntry = props => {
  console.log('Commit Entry Props: ', props.commit);
  const { commit } = props;
  return (
    <div>
      <div>{commit.author.name} - {commit.author.data}</div>
      <div>{commit.message}</div>
    </div>
  )
}

CommitEntry.propsTypes = {
  commit: PropTypes.object.isRequired,
}

export default CommitEntry;