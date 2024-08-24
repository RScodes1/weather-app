import React from "react";
import { useState } from "react";
import axios from "axios";
import './home.css';

const Home = () => {

    const [inputLoc, setinputLoc ] = useState("");
    const [Apidata, setApidata ] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [showGif, setShowGif] = useState(false);

const handleLocation = (e) => {

    setinputLoc(e.target.value);
    setError(null);
}


const checkValidity = (name) =>{
    return /^[a-zA-Z\s]+$/.test(name) && name.trim().length > 0;
}
   
     async function fetchData() {

        setLoading(true);
        setError(null);
        setShowGif(false);
        if (!checkValidity(inputLoc)) {
            setError("Please enter a valid city name (letters and spaces only).");
            setShowGif(true);
            setLoading(false);
            setTimeout(() => setShowGif(false), 5250);
            return;
        }

        try {
            // Make the api call
            const response = await axios.get(
                `https://api.openweathermap.org/data/2.5/weather?q=${inputLoc}&appid=226bc60742d4286f0a7f23177d6daded`
            );
                 const data = response.data;
            setApidata(data);
            
            console.log( "weather data:",Apidata);
            
           } catch (error) {
            setError("City not found. Please enter a valid city name.");
            setShowGif(true);
            setTimeout(() => setShowGif(false), 5250);
            console.log('Error fetching weather data:', error);
        }
           finally {
            setLoading(false);
          }
    }

    return (
        <div>
             <div className="background">
           <input type="text" value={inputLoc} name="Location" className="input-class" onChange={handleLocation} placeholder="Enter a location name" />
              <button className="submit-button" onClick={fetchData}>Submit</button>
               </div>
              {loading && <p className="loading" >Loading...</p>}
            
            {error && <p className="error-message" >{error} </p>}

            {showGif && 
                <div className="gif-container">
                <img 
                    height={200} 
                    width={350} 
                    src="https://i.pinimg.com/originals/96/3f/2f/963f2ffa6f7df91ab4ae0fb4f3ee2cf9.gif" 
                    alt="brahmmi" 
                />
                </div>        
                 }

                  {!showGif && Apidata !== null &&
                <div className="gif-container">
                <img 
                    height={150} 
                    width={250} 
                    src="https://media1.tenor.com/m/gNKymZ194D8AAAAd/brahmi-king.gif" 
                    alt="brahmmi" 
                />
                </div>        
                 }

         
           {Apidata &&  !loading && !error &&  (
            <div className="weather-info">
                 <p>Temperature: <span>{(Apidata.main.temp - 273.15)}'C</span></p>
                     <p>Humidity: <span>{Apidata.main.humidity}%% </span></p>
                 <p>Wind Speed: <span>{(Apidata.wind.speed* (5/18))}km/h</span></p>
                <p>Brief Weather Description: <span>The weather has been in the condition of {Apidata.weather[0].description}</span></p>
            
            </div>
           )} 
           {/* <p></p>
           <p></p>
           <p></p>
           <p></p> */}
        </div>
    )
}

export default Home;

//temperature, humidity, wind speed, and a brief
// weather description.