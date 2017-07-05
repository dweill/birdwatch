import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import axios from 'axios';
import logo from '../../assets/images/bwlogo.png';

const style = {
  margin: 0,
  backgroundColor: '#f7b748',
  position: 'relative',
};
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    };
  }
  handleClick() {
    const loginObj = {
      username: this.state.username,
      password: this.state.password,
    };
    axios.post('/login', loginObj)
    .then((response) => {
      if (response.status === 200) {
        console.log('login successful');
        this.props.history.push('/timeline');
      } else if (response.status === 204) {
        this.props.history.push('/login');
      }
    })
    .catch((error) => {
      console.log(error, 'Error');
    });
  }
  render() {
    return (
      <div>
        <MuiThemeProvider>
          <div>
            <img src={logo} alt="logo" style={{ width: 400, height: 400, display: 'block', margin: 'auto', position: 'relative' }} />
            <br />
            <div className="login" >
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
                label="Login"
                style={style}
                fullWidth
                onClick={event => this.handleClick(event)}
              />
              <br />
              <br />
              <FlatButton
                label="SignUp"
                containerElement={<Link to="/signup" />}
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

Login.propType = {
  history: PropTypes.object.isRequired,
};

export default Login;
