import React from "react";
import Card from "./Card";

const AvailableCountry = ({ weatherData, onDelete }) => {

    return (
        <div>
            {weatherData.map((data) => {
                return <Card key={data.location.name} uniqueId={data.location.name} weatherData={data} onDelete={onDelete} />
            })}
        </div>
    )
}

export default AvailableCountry;