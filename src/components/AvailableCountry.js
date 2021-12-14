import React from "react";
import Card from "./Card";
import './availableCountry.css';

const AvailableCountry = ({ weatherData, onDelete }) => {

    return (
        <div className="weather mv">
            {weatherData.map((data) => {
                console.log(data);
                return <Card key={data.name} uniqueId={data.name} weatherData={data} onDelete={onDelete} />
            })}
        </div>
    )
}

export default AvailableCountry;