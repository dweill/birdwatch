import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardHeader, CardTitle } from 'material-ui/Card';
import Moment from 'moment-timezone';

const ProfilePost = ({ bird, location, created }) => (
  <Card>
    <CardTitle title={`Birdtype: ${bird}`} />
    <br />
    <CardTitle title={`Location: ${location}`} />
    <br />
    <CardHeader
      title={`spotted ${Moment(created).calendar()}`}
    />
  </Card>
);

ProfilePost.propTypes = {
  bird: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
  created: PropTypes.string,
};

export default ProfilePost;

