import React from "react";

const Card = ({ weatherData, onDelete, uniqueId }) => {

    // const weatherTemp = weatherData.current.temp_c;
    // const weatherCountry = `${weatherData.location.name}, ${weatherData.location.country}`;
    // const weatherClimate = weatherData.current.condition.text;
    // const weatherClimateIcon = weatherData.current.condition.icon;
    // const dateTime = weatherData.location.localtime;

    
    const weatherTemp = weatherData.main.temp;
    const weatherCountry = `${weatherData.city.name}, ${weatherData.city.country}`;
    const weatherCondition = weatherData.weather.description;
    const weatherClimateIcon = weatherData.weather.icon;
    

    const getLocation = () => {
        onDelete(uniqueId);
    }

    return (
        <div>
            
            <h2>{weatherCountry}</h2>
            <h2 className>{weatherTemp}<span> °C</span></h2>
            <h2>{weatherCondition}</h2>
            <img src={weatherClimateIcon} />
           
            <button onClick={getLocation}>Delete</button>
        </div>
    )
}


export default Card;