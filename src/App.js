
import React, { useState, useEffect } from 'react';
import Searchbox from './components/Searchbox';
import AvailableCountry from './components/AvailableCountry';
import Axios from 'axios';
import './App.css';

const dumyLocations =[
    {countryName: 'london'},
    {countryName: 'SriLanka'},
    {countryName: 'UnitedStates' },
    {countryName: 'Australia'  },
    {countryName: 'Canada'  },
    {countryName: 'France'  },
    {countryName: 'Germany'  },
    {countryName: 'India'  },
    {countryName: 'Japan'  },
    {countryName: 'Malaysia'  },
  ];
  
   
  function App(){
    const APIKEY = '27c153ee5d148f36ddd2c549810e9dc5';
    const [locations, setLocations] = useState([]);
    const [weatherData, setWeatherData] = useState([]);
    const [temp, setTemp] = useState(dumyLocations);
    const [isEdited, setIsEdited] = useState(false);
    const [isError, setIsError] = useState(false);

    // useEffect(() => {
    //   getLocations();
    //   getIsEdited();
    //   firstRunTime();
    //   setTimeout(() => {
    //     const getLocation = JSON.parse(localStorage.getItem('locations'));
    //     if (getLocation !== null) {
    //       getLocation.map((location) => {
    //         Axios
    //           .get(`http://api.openweathermap.org/data/2.5/weather?q=${location.countryName}&appid=${APIKEY}`)
    //           .then(response => {
    //             setWeatherData((prevWeathers) => {
    //               const updateWeather = [...prevWeathers];
    //               updateWeather.push(response.data);
    //               setWeatherData(updateWeather);
    //             })
    //           });
    //       })
    //     }
    //   })
    // }, [])
  
    useEffect(() => {
      saveLocations();
      saveIsEdited();
    }, [locations, isEdited])
  
    const fetchData = async (location) => {
  
      try {
        const response = await Axios.get(
          `http://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${APIKEY}`,
        )
        setLocations( (state)=> [...state, {location:{name:location}}] )
         
        
        console.log(response.data);
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
  
    const firstRunTime = () => {
      if (localStorage.getItem('isEdited') === 'false') {
        setLocations(temp);
      }
    }

    // const kelvinToFarenheit = (k) => {
    //   return (k - 273.15).toFixed(2);
    // };
    return(
      <div>
       
        <Searchbox fetchData={(loc) => fetchData(loc)} />
        {isError && <p className="error">Wrong Location!! Please Enter correct Location</p>}
        {locations.length === 0 ? 
        <h3>Empty Data</h3>: <AvailableCountry weatherData={weatherData}/>}
      </div>
    );
  }

export default App;
