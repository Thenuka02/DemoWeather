import React,{useState} from 'react';
import'./Searchbox.css'

const Searchbox = ({ fetchData }) => {

    const [location, setLocation] = useState('');

    const addWeather = (e) => {
        e.preventDefault();
        if (location.trim().length > 0) {
            fetchData(location);
            setLocation('');
        }
    }

    const locationHandler = (event) => {
        setLocation(event.target.value);
    }


return(
    <div className="main">     
     <form onSubmit={addWeather}>
      <div className="searchInputs">
        <input
            value={location}
            type="text"
            id="header-search"
            placeholder="Enter country name"
            onChange={locationHandler} 
        />
        <div>
        <button className= "searchButton">
        Search</button>
        </div>
        </div>
    </form>
    </div>
)

};
export default Searchbox;