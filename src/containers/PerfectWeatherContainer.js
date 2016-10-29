import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import moment from 'moment';

import { requestForecasts } from '../redux/modules/perfectWeather';

class PerfectWeatherContainer extends React.Component {
  static propTypes = {
    requestForecasts: React.PropTypes.func.isRequired,
    processedForecasts: React.PropTypes.object.isRequired
  };

  componentWillMount () {
    this.props.requestForecasts();
  }

  render () {
    this.props.processedForecasts.map((processedForecast) => {
      console.log(moment.unix(processedForecast.get('timestamp')).format('ddd, hA'), processedForecast.get('isPerfectWind'));
    });
    return (
      <div>
        hi
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    processedForecasts: state.perfectWeather.get('processedForecasts')
  };
};

function mapDispatchToProps (dispatch) {
  return bindActionCreators({
    requestForecasts
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(PerfectWeatherContainer);
