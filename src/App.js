import './App.css';
import React, { useState, useEffect } from 'react';
import Searchbox from './components/Searchbox';
import AvailableCountry from './components/AvailableCountry';
import Axios from 'axios';

const dumyLocations =[
  {countryName: 'Sri Lanka'},
  {countryName: 'United Kingdom'},
  {countryName: 'United States' },
  {countryName: 'Australia'  },
];

function App() {
  const API_Key = '2b6d12abac88542310b460e70fed6f48';
  //const URL = `http://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}`
  const [locations, setLocations] = useState([]);
  const [weatherData, setWeatherData] = useState([]);
  const [temp, setTemp] = useState(dumyLocations);
  const [isEdited, setIsEdited] = useState(false);
  const [isError, setIsError] = useState(false);
    
  useEffect(() => {
    getLocations();
    getIsEdited();
    setTimeout(() => {
      const getLocation = JSON.parse(localStorage.getItem('locations'));
      if (getLocation !== null) {
        getLocation.map((location) => {
          Axios
            .get(`http://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}`)
            .then(response => {
              setWeatherData((prevWeathers) => {
                const updateWeather = [...prevWeathers];
                updateWeather.push(response.data);
                setWeatherData(updateWeather);
              })
            });
        })
      }
    })
  }, []);

  useEffect(() => {
    saveLocations();
    saveIsEdited();
  }, [locations, isEdited])

  const fetchData = async (location) => {

    try {
      const response = await Axios.get(
        `http://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${location}&aqi=no`,
      )
      setLocations((prevLoc) => {
        const updateLocations = [...prevLoc];
        updateLocations.unshift({ loc: response.data.location.name });
        setLocations(updateLocations);
      })
      setWeatherData((prevWeathers) => {
        const updateWeather = [...prevWeathers];
        updateWeather.push(response.data);
        setWeatherData(updateWeather);
      });
      setIsEdited(true);
    } catch (error) {
      setIsError(true);
      setTimeout(() => {
        setIsError(false);
      }, 3000)
      console.log(error.response); 
    }
  }

  const deleteHandler = (selectedLoc) => {
    setWeatherData(prevLoc => {
      const updatedWeather = prevLoc.filter((weather) => {
        return weather.location.name !== selectedLoc
      });
      return updatedWeather;
    });
    setLocations((prev) => {
      const updatedLocations = prev.filter((location) => {
        return location.loc.toLowerCase() !== selectedLoc.toLowerCase()
      });
      return updatedLocations;
    });
    setIsEdited(true);
  }

  const saveLocations = () => {
    localStorage.setItem('locations', JSON.stringify(locations));
  }

  const getLocations = () => {
    if (localStorage.getItem('locations') === null) {
      localStorage.setItem('locations', JSON.stringify(locations))
    } else {
      let locationLocal = JSON.parse(localStorage.getItem('locations'));
      setLocations(locationLocal);
    }
  }

  const saveIsEdited = () => {
    localStorage.setItem('isEdited', JSON.stringify(isEdited));
  }

  const getIsEdited = () => {
    if (localStorage.getItem('isEdited') == null) {
      localStorage.setItem('isEdited', isEdited);
    } else {
      let editedLocal = JSON.parse(localStorage.getItem('isEdited'));
      setIsEdited(editedLocal);
    }
  }

  return (
    <div >
      <Searchbox 
      fetchData={fetchData} />
      {isError && <p className="error">Wrong Location!! Please Enter correct Location</p>}
      {locations.length === 0 ? 
      <h3>No Data...</h3>
      : <AvailableCountry weatherData={weatherData} onDelete={deleteHandler} />}
    </div>
  );
}

export default App;
