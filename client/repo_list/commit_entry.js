import React from 'react'
import PropTypes from 'prop-types';
import dateFns from 'date-fns';

const CommitEntry = props => {
  console.log('Commit Entry Props: ', props.commit);
  const { commit } = props;
  const date = dateFns.distanceInWordsToNow(new Date(commit.author.date));
  return (
    <div>
      <div>{commit.author.name} - {date} ago</div>
      <div>{commit.message}</div>
    </div>
  )
}

CommitEntry.propsTypes = {
  commit: PropTypes.object.isRequired,
}

export default CommitEntry;