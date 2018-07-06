import React, {Component} from 'react';
import { connect } from 'react-redux';
import Chart from '../components/chart';
import GoogleMap from '../components/google_map';

class WeatherList extends Component {
  renderWeather(cityData) {
    const name = cityData.city.name;
    const temps = cityData.list.map(weather => weather.main.temp);
    const pressures = cityData.list.map(weather => weather.main.pressure);
    const humidity = cityData.list.map(weather => weather.main.humidity);
    const { lat, lon } = cityData.city.coord;

    return (
      <tr key={name}>
        <td><GoogleMap lat={lat} lon={lon} /></td>
        <td>
          <Chart data={temps} color='red' unit="K"/>
        </td>
        <td>
          <Chart data={pressures} color='green' unit="hPa"/>
        </td>
        <td>
          <Chart data={humidity} color='blue' unit="%"/>
        </td>
      </tr>
    );
  }

  render() {
      return <table className="table table-hover">
        <thead>
          <tr>
          <th> City </th>
          <th> Temperature (k)</th>
          <th> Pressure (hPa)</th>
          <th> Humidity (%)</th>
          </tr>
        </thead>
        <tbody>
          {this.props.weather.map(this.renderWeather)}
        </tbody>
      </table>
  }
}

function mapStateToProps(state) {
    return { weather: state.weather };
}

export default connect(mapStateToProps)(WeatherList);
