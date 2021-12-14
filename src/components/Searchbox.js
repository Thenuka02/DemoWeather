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
    <div  className="select"> 
     <form onSubmit={addWeather}>
            <select name="weather" id="weather" onChange={locationHandler} >
             <option value="sriLanka">SriLanka</option>
             <option value="london">London</option>
             <option value="unitedStates">UnitedStates</option>
             <option value="australia">Australia</option>
             <option value="canada">Canada</option>
             <option value="france">France</option>
             <option value="germany">Germany</option>
             <option value="india">India</option>
             <option value="japan">Japan</option>
             <option value="malaysia">Malaysia</option>
            </select>
        <div>
        <button className="addButton">
        Add</button>
        </div>   
    </form>
    </div>
    </div>
)
};
export default Searchbox;