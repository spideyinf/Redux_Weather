import React, { Component } from 'react';
import { connect } from 'react-redux';

import Chart from '../components/Chart';
import GoogleMap from '../components/GoogleMap';

class WeatherList extends Component {
  renderWeather(data) {
    const name = data.city.name;
    const temps = _.map(
      data.list.map(weather => weather.main.temp),
      temp => temp - 273
    );
    const pressures = data.list.map(weather => weather.main.pressure);
    const humidities = data.list.map(weather => weather.main.humidity);
    const { lon, lat } = data.city.coord;

    return (
      <tr key={name}>
        <td>
          <GoogleMap lon={lon} lat={lat} />
        </td>
        <td>
          <Chart data={temps} color="orange" units="°C" />
        </td>
        <td>
          <Chart data={pressures} color="red" units="hPa" />
        </td>
        <td>
          <Chart data={humidities} color="lightblue" units="%" />
        </td>
      </tr>
    );
  }
  render() {
    return (
      <table className="table table-hover">
        <thead>
          <tr>
            <th>City</th>
            <th>Temparature</th>
            <th>Pressure</th>
            <th>Humidity</th>
          </tr>
        </thead>
        <tbody>{this.props.weather.map(this.renderWeather)}</tbody>
      </table>
    );
  }
}

function mapStateToProps({ weather }) {
  return { weather };
  // { weather } === { weather: weather }
}

export default connect(mapStateToProps)(WeatherList);
