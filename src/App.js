import React, { Component, PropTypes } from 'react';
import { Provider } from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Router from './Router';

class App extends Component {
  static propTypes = {
    store  : PropTypes.object.isRequired
  }

  shouldComponentUpdate () {
    return false;
  }

  render () {
    const { store } = this.props;

    return (
      <Provider store={store}>
        <MuiThemeProvider>
          <div style={{ height: '100%' }}>
            <Router store={store} />
          </div>
        </MuiThemeProvider>
      </Provider>
    );
  }
}

export default App;
