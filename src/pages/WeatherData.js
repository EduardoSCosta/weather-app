import React, {useState} from 'react';
import api from '../services/api';
import './WeatherData.css';

function WeatherData () {
  const apiKey = "Y8BcqOPRPHAHWElYwRLnr7rXezu1wSKZ";

  const [cityForm, setCityForm] = useState("");
  const [weatherMax, setWeatherMax] = useState();
  const [weatherMin, setWeatherMin] = useState();
  const [unit, setUnit] = useState("");
  const [cityName, setCityName] = useState("");
  const [countryName, setCountryName] = useState("");
  const [day, setDay] = useState("");
  const [night, setNight] = useState("");
  const [dayIcon, setDayIcon] = useState();
  const [nightIcon, setNightIcon] = useState();

  const api_call = async e => {
    e.preventDefault()

    const cityRequest = api.get(`locations/v1/cities/search?apikey=Y8BcqOPRPHAHWElYwRLnr7rXezu1wSKZ&q=${cityForm}&language=pt-br`);
    const cityResponse = await cityRequest;

    if (cityResponse.data.length !== 0) {

      setCityName(cityResponse.data[0].LocalizedName + ",");
      setCountryName(cityResponse.data[0].Country.LocalizedName);

      const cityCode = cityResponse.data[0].Key;

      const request = api.get(`forecasts/v1/daily/1day/${cityCode}?apikey=${apiKey}&language=pt-br&metric=true`);
      const response = await request;

      setWeatherMax("Max " + response.data.DailyForecasts[0].Temperature.Maximum.Value);
      setWeatherMin("Min " + response.data.DailyForecasts[0].Temperature.Minimum.Value);
      setUnit("°" + response.data.DailyForecasts[0].Temperature.Minimum.Unit);
      setDay("Dia: " + response.data.DailyForecasts[0].Day.IconPhrase);
      setNight("Noite: " + response.data.DailyForecasts[0].Night.IconPhrase);
      setDayIcon(response.data.DailyForecasts[0].Day.Icon);
      setNightIcon(response.data.DailyForecasts[0].Night.Icon);
    }
  }

  const handleChange = (e) => {
    setCityForm(e.target.value)
  }

  return (
    <div className="container">
      <form className="search-form" onSubmit={api_call}>
        <input className="search-field" 
              placeholder="Digite a cidade"
              type="text"
              value={cityForm}
              onChange={handleChange}/>
        <button className="search-button" type="submit">Buscar</button>
      </form>
        <h2>{cityName} {countryName}</h2>
        <div className="min-max">
          <p className="weather">{weatherMax} {unit}</p>
          <p className="weather">{weatherMin} {unit}</p>
        </div>
        <p className="weather-condition">{day}</p>
        <p className="weather-condition">{night}</p>
    </div>
  );

}

export default WeatherData;