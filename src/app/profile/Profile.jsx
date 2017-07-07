import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Avatar from 'material-ui/Avatar';
import axios from 'axios';
import Header from '../Header.jsx';
import Footer from '../timeline/Footer.jsx';
import ProfilePost from './ProfilePost.jsx';
import image from '../../assets/images/cursorBW.png';
import ProfileMap from './ProfileMap.jsx';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profileData: null,
    };
    this.loadProfile = this.loadProfile.bind(this);
  }
  componentWillMount() {
    this.loadProfile();
  }
  loadProfile() {
    axios.get('/profile').then((data) => {
      this.setState({ profileData: data.data });
      console.log(this.state.profileData, 'after');
    }).catch((error) => {
      console.error(error);
    });
  }
  render() {
    return (
      <div>
        <div>
          <MuiThemeProvider>
            <div>
              <Header />
              <h1>My Bird List</h1> <img src={image} alt="logo" />
              <div>
                {this.state.profileData && <ProfileMap
                google={window.google}
                latLng={{ lat: 29.95106579999999, lng: -90.0715323 }}
                profileData={this.state.profileData}
                />}
              </div>
              <div className="Profile">
                {this.state.profileData && this.state.profileData.map(post => (
                  <ProfilePost
                    bird={post.bird}
                    location={post.location}
                    created={post.created}
                    key={post.id}
                  />
                ))}
              </div>
              <Footer />
            </div>
          </MuiThemeProvider>
        </div>
      </div>
    );
  }
}


export default Profile;
// if you can save images to the database you can have the profile picture pop up for each person
// {/*<Avatar
//   src={image}
//   size={70}
//   style={{ display: 'inline' }}
// />*/}
