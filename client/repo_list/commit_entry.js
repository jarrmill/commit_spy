import React from 'react'
import PropTypes from 'prop-types';
import dateFns from 'date-fns';
import { CommitContainer, Commit, AvatarContainer, Avatar, BodyContainer, HeaderContainer, Name } from './styles';

const CommitEntry = props => {
  const { commit, isRepeat } = props;
  const avatar_url = (commit.author) ? commit.author.avatar_url : 'https://github.com/identicons/jasonlong.png';
  const date = dateFns.distanceInWordsToNow(new Date(commit.commit.author.date));
  return (!isRepeat) ? (
    <CommitContainer isRepeat={isRepeat}>
      <AvatarContainer>
        <Avatar src={avatar_url}/>
      </AvatarContainer>
      <Commit>
        <HeaderContainer>
          <Name>{commit.commit.author.name}</Name>
          <i>{` - ${date} ago`}</i>
        </HeaderContainer>
        <BodyContainer>
          {commit.commit.message}
        </BodyContainer>
      </Commit>
    </CommitContainer>
  ) : (
    <CommitContainer isRepeat={isRepeat}>
      <AvatarContainer>
      </AvatarContainer>
      <Commit>
        <BodyContainer>
          <i>{`${date} ago - `}</i>
          {commit.commit.message}
        </BodyContainer>
      </Commit>
    </CommitContainer> 
  )
}

CommitEntry.propsTypes = {
  commit: PropTypes.object.isRequired,
  isRepeat: PropTypes.bool
}

export default CommitEntry;