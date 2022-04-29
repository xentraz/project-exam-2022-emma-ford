// React
import React from 'react';
import { useState, useEffect } from 'react';
// Mantine
import { DateRangePicker } from '@mantine/dates';
// Multi Select
import MultiSelect from  'react-multiple-select-dropdown-lite'
import  'react-multiple-select-dropdown-lite/dist/index.css'
// Weather
import { WeatherApiURL } from '../Weather/API/WeatherAPI';
// Axios
import axios from 'axios';

function HeroIndex() {
  const [value, setValue] = useState("");
  const [weather, setWeather] = useState('');
  // const [data, setData] = useState({});

  const WatherApiKey = `efcd48a6ebf30ba8437bc21079c510a6`;
  // const WeatherApiURL = `https://api.openweathermap.org/data/2.5/weather?q=bergen&units=metric&appid=` + WatherApiKey;
  console.log(WeatherApiURL);
  // const cancelTokenSource = axios.CancelToken.source();

  useEffect(() => {
    const cancelTokenSource = axios.CancelToken.source();
    async function fetchData() {
      try {
        const result = await axios(WeatherApiURL, {
          method: 'get',
          cancelToken: cancelTokenSource.token,
        });
        setWeather(result.data);
      } catch (error) {
        console.log(error);
      } finally {
        cancelTokenSource.cancel();
      }
    }
    fetchData();
  })

  // useEffect(() => {
  //   axios.get(WeatherApiURL)
  //   .then((response) => {
  //     setWeather(response.data);
  //     cancelToken: cancelTokenSource.token;
  //   })
  //   .catch(err => {
  //     console.log(err);
  //   })
  //   cancelTokenSource.cancel();
  // });

  if (!weather) {
    return <div className="loading">Loading...</div>;
  }

  console.log(weather);

  return (
    <>
      <div className="heroIndex">
        <div className="heroIndex-weather">
          <p>Current Weather:</p>
          <p>{weather.main.temp.toFixed()}°C</p>
        </div>
        <div className="heroIndex-text">
          <h1 className="heroIndex-text-title">Explore Bergen</h1>
          <p className="heroIndex-text-substrate">From all corners of the city and the comfort of our best stays</p>
        </div>
        <div className="heroIndex-content">
        <div className="heroIndex-content-guestSelect">
          <label>Dropdown label</label>
          {/* <MultiSelect
            className="multi-select"
            onChange={handleOnchange}
            options={options}
            customValue={true}
          /> */}
          <br />
          <p>{value}</p>
        </div>
          <DateRangePicker
            label="Book a place to stay"
            placeholder="Pick dates range"
            value={value}
            onChange={setValue}
          />
        </div>
      </div>
    </>
  )
}

export default HeroIndex


  // const handleOnchange = (val) => setValue(val);

  // const options = [
  //   { label: "1 Adult(s)", value: "1 Adult" },
  //   { label: "2 Adult(s)", value: "2 Adults" },
  //   { label: "3 Adult(s)", value: "3 Adults" },
  //   { label: "4 Adult(s)", value: "4 Adults" },
  //   { label: "1 Child(ren)", value: "1 Child" },
  //   { label: "2 Child(ren)", value: "2 Children" },
  //   { label: "3 Child(ren)", value: "3 Children" },
  //   { label: "4 Child(ren)", value: "4 Children" },
  // ];
  // const [newCompany, setCompany] = useState("");
  // const [newPosition, setPosition] = useState("");