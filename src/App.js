import './App.css';
import React, { useState, useEffect } from 'react';
import Searchbox from './components/Searchbox';
import AvailableCountry from './components/AvailableCountry';
import Axios from 'axios';

const dumyLocations =[
  {countryName: 'london'},
  {countryName: 'United Kingdom'},
  {countryName: 'United States' },
  {countryName: 'Australia'  },
];

function App() {
  const APIKey = '27c153ee5d148f36ddd2c549810e9dc5';
  //const URL = `http://api.openweathermap.org/data/2.5/weather?q=${city name}&appid=${APIkey}`;
  const [locations, setLocations] = useState([]);
  const [weatherData, setWeatherData] = useState([]);
  const [temp, setTemp] = useState(dumyLocations);
  const [isEdited, setIsEdited] = useState(false);
  const [isError, setIsError] = useState(false);
    
  useEffect(() => {
    getLocations();
    getIsEdited();
    setTimeout(() => {
      // const getLocation = JSON.parse(localStorage.getItem('locations'));
      const getLocation = [1];
      if (getLocation !== null) {
        getLocation.map((city)  => {
          console.log(city)
          Axios
      
            .get(`http://api.openweathermap.org/data/2.5/weather?q=${dumyLocations[0].countryName}&appid=${APIKey}`)
            .then(response => {
              console.log(response)
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

  const fetchData = async (cityname) => {

    try {
      const response = await Axios.get(
        `http://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}`,
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
      <h3>Empty Data</h3>
      : <AvailableCountry weatherData={weatherData} onDelete={deleteHandler} />}
    </div>
  );
}

export default App;
