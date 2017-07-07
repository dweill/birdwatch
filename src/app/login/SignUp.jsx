import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import { Link } from 'react-router-dom';
import axios from 'axios';
import cryptiles from 'cryptiles';
import logo from '../../assets/images/bwlogo.png';

const style = {
  margin: 0,
  backgroundColor: '#f7b748',
  display: 'block',
  position: 'relative',
};

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    };
  }

  handleClick() {
    const signupObj = {
      username: this.state.username,
      password: this.state.password,
    };
    axios.post('/signup', signupObj)
    .then((response) => {
      if (response.status === 200) {
        console.log('sign up successful');
        localStorage.setItem('watcherToken', cryptiles.randomString(100));
        window.location.href = '/timeline';
      } else if (response.status === 204) {
        window.location.href = '/signup';
      }
    })
    .catch((error) => {
      console.error(error, 'Error');
    });
  }
  render() {
    return (
      <div>
        <MuiThemeProvider>
          <div>
            <img src={logo} alt="logo" style={{ width: 400, height: 400, display: 'block', margin: 'auto', position: 'relative' }} />
            <br />
            <div className="signup">
              <TextField
                hintText="Enter your Username"
                floatingLabelText="Username"
                fullWidth
                onChange={(event, newValue) => this.setState({ username: newValue })}
              />
              <br />
              <TextField
                type="password"
                hintText="Enter your Password"
                floatingLabelText="Password"
                fullWidth
                onChange={(event, newValue) => this.setState({ password: newValue })}
              />
              <br />
              <FlatButton
                label="Sign up"
                style={style}
                fullWidth
                onClick={event => this.handleClick(event)}
              />
              <br />
              <FlatButton
                label="Login"
                containerElement={<Link to="/login" />}
                style={style}
                fullWidth
              />
            </div>
          </div>
        </MuiThemeProvider>
      </div>
    );
  }
}

export default SignUp;
