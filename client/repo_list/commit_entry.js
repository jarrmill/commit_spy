import React from 'react'
import PropTypes from 'prop-types';
import dateFns from 'date-fns';
import { CommitContainer, User, AvatarContainer, Avatar, BodyContainer, ButtonContainer, Button, HeaderContainer, Name } from './styles';

const makeTreeUrl = function(html_url, sha) {
  const arr = html_url.split('/');
  const result = arr.slice(0, 5).join('/') + '/tree/' + sha;
  return result;
}

const CommitEntry = ({commit }) => {

  const { sha, html_url} = commit;
  const sliceLength = 60;
  const tree_url = makeTreeUrl(html_url, sha);
  const avatar_url = (commit.author) ? commit.author.avatar_url : 'https://github.com/identicons/jasonlong.png';
  const date = dateFns.distanceInWordsToNow(new Date(commit.commit.author.date));

  return (
    <CommitContainer>
      <BodyContainer>
        <HeaderContainer>
          <b>{commit.commit.message.slice(0, sliceLength)}...</b>
        </HeaderContainer>
        <User>
          <AvatarContainer>
            <Avatar src={avatar_url}/>
          </AvatarContainer>
            {commit.commit.author.name}
            <i>{` - ${date} ago`}</i>
        </User>
      </BodyContainer>
      <ButtonContainer>
        <Button onClick={() => window.open(html_url, '_blank')}>{sha.slice(0, 8)}</Button>
        <Button onClick={() => window.open(tree_url, '_blank')}>{"< >"}</Button>
      </ButtonContainer>
    </CommitContainer>
  )
}

CommitEntry.propsTypes = {
  commit: PropTypes.object.isRequired,
  isRepeat: PropTypes.bool
}

export default CommitEntry;