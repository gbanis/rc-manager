import React, { Component, PropTypes } from 'react';

class AppContainer extends Component {
  static propTypes = {
    routes : PropTypes.object.isRequired,
    store  : PropTypes.object.isRequired
  }

  shouldComponentUpdate () {
    return false;
  }

  render () {
    return (
      <div style={{ height: '100%' }}>
        hi
      </div>
    );
  }
}

export default AppContainer;
