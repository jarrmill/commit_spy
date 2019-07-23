import React from 'react'
import PropTypes from 'prop-types';
import dateFns from 'date-fns';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';

const useStyles = makeStyles({
  card: {
    minWidth: 275,
    backgroundColor: '#ddd',
    margin: '5px'
  }
});

const CommitEntry = props => {
  const { commit } = props;
  const classes = useStyles();
  const avatar_url = (commit.author) ? commit.author.avatar_url : 'https://github.com/identicons/jasonlong.png';
  const date = dateFns.distanceInWordsToNow(new Date(commit.commit.author.date));
  return (
    <Card className={classes.card}>
      <CardHeader avatar={
        <Avatar src={avatar_url}/>
        }
        title={commit.commit.author.name}
        subheader={`- ${date} ago -`}
        />
      <CardContent>
        <Typography variant="body1" color="textPrimary" component="p">
          {commit.commit.message}
        </Typography>
      </CardContent>
    </Card>
  )
}

CommitEntry.propsTypes = {
  commit: PropTypes.object.isRequired,
}

export default CommitEntry;