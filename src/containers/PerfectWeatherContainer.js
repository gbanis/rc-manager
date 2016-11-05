import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import moment from 'moment';
import Chip from 'material-ui/Chip';
import { blue300 } from 'material-ui/styles/colors';

import { requestForecasts } from '../redux/modules/perfectWeather';

class PerfectWeatherContainer extends React.Component {
  static propTypes = {
    requestForecasts: React.PropTypes.func.isRequired,
    forecasts: React.PropTypes.object.isRequired
  };

  componentWillMount () {
    this.props.requestForecasts();
  }

  render () {
    const list = this.props.forecasts.get('list');

    if (!list) return <div />;

    const forecastsByDay = list.groupBy((item) => {
      return moment.unix(item.get('timestamp')).format('Y-M-D');
    });

    const nodes = forecastsByDay.map((dailyForecasts, day) => {
      const dayNodes = dailyForecasts.map((item) => {
        return (
          <Chip
            style={{display: 'inline-block'}}
            backgroundColor={item.get('isPerfect') ? blue300 : ''}
            key={item.get('timestamp')}
          >
            {moment.unix(item.get('timestamp')).format('hA')}
          </Chip>
        );
      });

      return (
        <div>
          <h1>{moment(day, "YYYY-MM-DD").format('dddd M/D')}</h1>
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
