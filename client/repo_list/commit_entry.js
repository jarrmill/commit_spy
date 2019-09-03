import React from 'react'
import PropTypes from 'prop-types';
import dateFns from 'date-fns';
import { CommitContainer, User, AvatarContainer, Avatar, BodyContainer, ButtonContainer, HeaderContainer, Name } from './styles';

const CommitEntry = props => {
  const { commit, isRepeat } = props;
  const sliceLength = 60;
  const { author, sha} = commit;
  console.log('Commit: ', author, sha);
  const avatar_url = (commit.author) ? commit.author.avatar_url : 'https://github.com/identicons/jasonlong.png';
  const date = dateFns.distanceInWordsToNow(new Date(commit.commit.author.date));
  return (
    <CommitContainer isRepeat={false}>
      <BodyContainer>
        <HeaderContainer>
          <p>{commit.commit.message.slice(0, sliceLength)}...</p>
        </HeaderContainer>
      <User>
        <AvatarContainer>
          <Avatar src={avatar_url}/>
        </AvatarContainer>
          <Name>{commit.commit.author.name}</Name>
          <i>{` - ${date} ago`}</i>
      </User>
      </BodyContainer>
      <ButtonContainer>
        <p>Button Container</p>
      </ButtonContainer>
    </CommitContainer>
  )
}

CommitEntry.propsTypes = {
  commit: PropTypes.object.isRequired,
  isRepeat: PropTypes.bool
}

export default CommitEntry;