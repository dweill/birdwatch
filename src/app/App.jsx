/* global localStorage */

import React from 'react';
import { Route, Switch, BrowserRouter, Redirect } from 'react-router-dom';
import Login from './login/Login';
import SignUp from './login/SignUp';
import MapContainer from './map/MapContainer';
import TimeLine from './timeline/Timeline';
import SplashPage from './login/SplashPage';
import CommentPage from './timeline/Comment';
import NotFound from './NotFound';
import Profile from './profile/Profile';
import './App.scss';

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route
        exact
        path="/"
        render={() => (
        localStorage.getItem('watcherToken') !== null ? (
          <Redirect to="/timeline" />
        ) : (
          <SplashPage />
        )
      )}
      />
      <Route
        path="/map"
        render={() => (
        localStorage.getItem('watcherToken') === null ? (
          <Redirect to="/login" />
        ) : (
          <MapContainer />
        )
      )}
      />
      <Route
        path="/login"
        render={() => (
        localStorage.getItem('watcherToken') !== null ? (
          <Redirect to="/timeline" />
        ) : (
          <Login />
        )
      )}
      />
      <Route
        path="/signup"
        render={() => (
        localStorage.getItem('watcherToken') !== null ? (
          <Redirect to="/timeline" />
        ) : (
          <SignUp />
        )
      )}
      />
      <Route
        path="/timeline"
        render={() => (
        localStorage.getItem('watcherToken') === null ? (
          <Redirect to="/login" />
        ) : (
          <TimeLine />
        )
      )}
      />
      <Route path="/logout" component={SplashPage} />
      <Route
        path="/comment"
        render={() => (
        localStorage.getItem('watcherToken') === null ? (
          <Redirect to="/login" />
        ) : (
          <CommentPage />
        )
      )}
      />
      <Route
        path="/profile"
        render={() => (
        localStorage.getItem('watcherToken') === null ? (
          <Redirect to="/login" />
        ) : (
          <Profile />
        )
      )}
      />
      <Route path="*" component={NotFound} />
    </Switch>
  </BrowserRouter>
);

export default App;
