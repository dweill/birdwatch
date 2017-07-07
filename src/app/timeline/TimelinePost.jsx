import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardHeader, CardTitle, CardMedia } from 'material-ui/Card';
import Moment from 'moment-timezone';
import Dropzone from 'react-dropzone';

const TimelinePost = ({ bird, location, username, created, image }) => (

  <Card>
    <CardTitle title={`Birdtype: ${bird}`} />
    <br />
    <CardTitle title={`Location: ${location}`} />
    <br />
    <CardHeader
      title={`bird sighting by @${username}`}
      subtitle={`spotted ${Moment(created).calendar()}`}
    />
    <CardMedia>
      <img src={`${image}`} alt="" />
    </CardMedia>

  </Card>
);

TimelinePost.propTypes = {
  bird: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
  created: PropTypes.string,
  username: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
};

export default TimelinePost;
