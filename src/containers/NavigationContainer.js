import React from 'react';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

class NavigationContainer extends React.Component {

  static propTypes = {
    dispatch: React.PropTypes.func,
    routing: React.PropTypes.shape({
      locationBeforeTransitions: React.PropTypes.shape({
        pathname: React.PropTypes.string.isRequired
      }).isRequired
    }).isRequired
  };

  constructor (props) {
    super(props);
    this.state = {
      open: false
    };
  }

  closeMenu = () => this.setState({open: false});

  openMenu = () => this.setState({open: true});

  onHomeClick = () => {
    this.closeMenu();
    this.props.dispatch(push('/'));
  };

  onPerfectWeatherClick = () => {
    this.closeMenu();
    this.props.dispatch(push('/perfect-weather'));
  };

  // TODO GB: Put it in a better place. Maybe router?
  routeTitles = {
    '/': 'RC Buddy',
    '/home': 'RC Buddy',
    '/perfect-weather': 'PerfectWeather'
  };

  pickTitle = () => {
    const pathname = this.props.routing.locationBeforeTransitions.pathname;
    return this.routeTitles[pathname];
  };

  render () {
    return (
      <div>
        <AppBar
          title={this.pickTitle()}
          onLeftIconButtonTouchTap={this.openMenu}
        />
        <Drawer
          docked={false}
          width={250}
          open={this.state.open}
          onRequestChange={(open) => this.setState({open})}
        >
          <MenuItem onTouchTap={this.onHomeClick}>Home</MenuItem>
          <MenuItem onTouchTap={this.onPerfectWeatherClick}>Perfect Weather</MenuItem>
        </Drawer>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    routing: state.routing
  };
};

export default connect(mapStateToProps)(NavigationContainer);
