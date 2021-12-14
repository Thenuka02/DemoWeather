import React from "react";

const Card = ({ weatherData}) => {
    const temperature = weatherData.main.temp-273.15;
    const country = weatherData.name;
    const weatherCondition = weatherData.weather[0].description;
    const icon = weatherData.weather[0].icon;
     
    return (
        <div className="weather-card">
            <h2>{country}</h2>
            <h2 className="weather-temp" >{Math.round(temperature * 100) / 100}<span id="kelvinToFarenheit"> °C</span></h2>
            <h2>{weatherCondition}</h2>
            <img src={`http://openweathermap.org/img/w/${icon}.png`} alt="weather icon" />
        </div>
    )
}
export default Card;