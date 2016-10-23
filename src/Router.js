import React from 'react';
import { Router, Route, Redirect, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import AppContainer from './containers/AppContainer';
import HomeContainer from './containers/HomeContainer';
import PerfectWeatherContainer from './containers/PerfectWeatherContainer';

export default (props) => {
  const history = syncHistoryWithStore(browserHistory, props.store);

  return (
    <Router history={history}>
      <Redirect from="/" to="/home" />
      <Route path="/" component={AppContainer}>
        <Route path="home" component={HomeContainer} />
        <Route path="perfect-weather" component={PerfectWeatherContainer} />
      </Route>
    </Router>
  );
};

