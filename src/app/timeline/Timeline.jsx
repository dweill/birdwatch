import React, { Component } from 'react';
import axios from 'axios';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TimelinePost from './TimelinePost.jsx';
import Comment from './Comment.jsx';
import Footer from './Footer.jsx';
import Header from '../Header.jsx';
import ScrollToTop from 'react-scroll-up';
import LocationOn from 'material-ui/svg-icons/navigation/arrow-upward';
import { grey50 } from 'material-ui/styles/colors';
import Dropzone from 'react-dropzone';


const upIcon = <LocationOn color={grey50} />;

class Timeline extends Component {
  constructor() {
    super();
    this.state = {
      birdFeed: null,
    };
    this.loadFeed = this.loadFeed.bind(this);
  }
  componentWillMount() {
    this.loadFeed();
  }
  loadFeed() {
    axios.get('/birds').then((data) => {
      this.setState({ birdFeed: data.data });
      console.log(this.state.birdFeed, 'fetch birds');
    });
  }
  render() {
    return (
      <div>
        <MuiThemeProvider>
          <div>
            <Header />
            <Comment loadFeed={this.loadFeed} />
            <div className="bird-feed">
              {this.state.birdFeed && this.state.birdFeed.map(birdPost => (
                <TimelinePost
                  bird={birdPost.bird}
                  location={birdPost.location}
                  created={birdPost.created}
                  username={birdPost.username}
                  key={birdPost.id}
                  image={birdPost.image}
                />
              ))}
            </div>
            <ScrollToTop
              showUnder={100}
              style={{
                position: 'fixed',
                bottom: 20,
                right: 'auto',
                left: 30,
                transitionDuration: '0.2s',
                transitionTimingFunction: 'linear',
                transitionDelay: '0s' }}
            >
              <span>{upIcon}</span>
            </ScrollToTop>
            <Footer loadFeed={this.loadFeed} />
          </div>
        </MuiThemeProvider>
      </div>
    );
  }
}

export default Timeline;
