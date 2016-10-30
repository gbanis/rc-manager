import React from 'react';
import { Router, Route, Redirect, hashHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import AppContainer from './containers/AppContainer';
import HomeContainer from './containers/HomeContainer';
import PerfectWeatherContainer from './containers/PerfectWeatherContainer';

const CustomRouter = (props) => {
  const history = syncHistoryWithStore(hashHistory, props.store);

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

CustomRouter.propTypes = {
  store: React.PropTypes.object
};

export default CustomRouter;
