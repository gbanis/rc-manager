import React from 'react';
import NavigationContainer from './NavigationContainer';

export default class AppContainer extends React.Component {
  static propTypes = {
    children  : React.PropTypes.object
  }

  static prop

  render () {
    return (
      <div>
        <NavigationContainer />
        {this.props.children}
      </div>
    );
  }
}
