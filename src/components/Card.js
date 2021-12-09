import React from "react";

const Card = ({ weatherData, onDelete, uniqueId }) => {

    const weatherTemp = weatherData.current.temp_c;
    const weatherCountry = `${weatherData.location.name}, ${weatherData.location.country}`;
    const weatherClimate = weatherData.current.condition.text;
    const weatherClimateIcon = weatherData.current.condition.icon;
    const dateTime = weatherData.location.localtime;

    const getLocation = () => {
        onDelete(uniqueId);
    }

    return (
        <div className="weather-card">
            <h2>{weatherCountry}</h2>
            <h2 className="weather-temp">{weatherTemp}<span> °C</span></h2>
            <h2>{weatherClimate}</h2>
            <img src={weatherClimateIcon} />
            <h2>{dateTime}</h2>
            <button onClick={getLocation}>Delete</button>
        </div>
    )
}


export default Card;