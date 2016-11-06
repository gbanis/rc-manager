import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import moment from 'moment';
import Chip from 'material-ui/Chip';
import FontAwesome from 'react-fontawesome';
import { blue300 } from 'material-ui/styles/colors';

import { requestForecasts } from '../redux/modules/perfectWeather';
import { isPreferred } from '../lib/timeUtils';

const styles = {
  icons: {
    fontSize: 14,
    opacity: 0.5,
    paddingLeft: 3
  }
};
class PerfectWeatherContainer extends React.Component {
  static propTypes = {
    requestForecasts: React.PropTypes.func.isRequired,
    forecasts: React.PropTypes.object.isRequired
  };

  componentWillMount () {
    this.props.requestForecasts();
  }

  renderWindIcon (item) {
    if (item.get('isPerfectWind')) return;
    return <FontAwesome name="location-arrow" style={styles.icons} />;
  }

  renderRainIcon (item) {
    if (item.get('isPerfectRain')) return;
    return <FontAwesome name="tint" style={styles.icons} />;
  }

  renderTempIcon (item) {
    if (item.get('isPerfectTemp')) return;
    return <FontAwesome name="thermometer-half" style={styles.icons} />;
  }

  render () {
    const list = this.props.forecasts.get('list');

    if (!list) return <div />;

    const forecastsByDay = list.groupBy((item) => {
      return moment.unix(item.get('timestamp')).format('Y-M-D');
    });

    const nodes = forecastsByDay.map((dailyForecasts, day) => {
      const dayNodes = dailyForecasts.reduce((nodeArray, item) => {
        if (!isPreferred(item.get('timestamp'))) {
          return nodeArray;
        };

        return nodeArray.concat([
          <Chip
            style={{display: 'inline-block'}}
            backgroundColor={item.get('isPerfect') ? blue300 : ''}
            key={item.get('timestamp')}
          >
            {moment.unix(item.get('timestamp')).format('hA')}
            {this.renderWindIcon(item)}
            {this.renderRainIcon(item)}
            {this.renderTempIcon(item)}
          </Chip>
        ]);
      }, []);

      return (
        <div>
          <h1>{moment(day, 'YYYY-MM-DD').format('dddd M/D')}</h1>
          {dayNodes}
        </div>
      );
    });

    return (
      <div>
        {nodes}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    forecasts: state.perfectWeather.get('forecasts')
  };
};

function mapDispatchToProps (dispatch) {
  return bindActionCreators({
    requestForecasts
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(PerfectWeatherContainer);
