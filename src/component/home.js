import React, { useState } from "react";
import axios from "axios";
import './home.css';

const Home = () => {
    const [inputLoc, setInputLoc] = useState("");
    const [apiData, setApiData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [showErrorGif, setShowErrorGif] = useState(false);
    const [showSuccessGif, setShowSuccessGif] = useState(false);

    const handleLocation = (e) => {
        setInputLoc(e.target.value);
        setError(null);
    };

    const checkValidity = (name) => {
        return /^[a-zA-Z\s]+$/.test(name) && name.trim().length > 0;
    };

    async function fetchData() {
        setLoading(true);
        setError(null);
        setShowErrorGif(false);
        setShowSuccessGif(false);

        if (!checkValidity(inputLoc)) {
            setError("Please enter a valid city name (letters and spaces only).");
            setShowErrorGif(true);
            setLoading(false);
            setTimeout(() => setShowErrorGif(false), 5220); // Display error GIF for 4.2 seconds
            return;
        }

        try {
            const response = await axios.get(
                `https://api.openweathermap.org/data/2.5/weather?q=${inputLoc}&appid=226bc60742d4286f0a7f23177d6daded`
            );
            const data = response.data;
            setApiData(data);
            setShowSuccessGif(true);
            setTimeout(() => setShowSuccessGif(false), 2900); // Display success GIF for 6 seconds
            console.log("Weather data:", apiData);
        } catch (error) {
            setError("City not found. Please enter a valid city name.");
            setShowErrorGif(true);
            setTimeout(() => setShowErrorGif(false), 5220); // Display error GIF for 4.2 seconds
            console.log('Error fetching weather data:', error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div>
            <div className="background">
                <input
                    type="text"
                    value={inputLoc}
                    name="Location"
                    className="input-class"
                    onChange={handleLocation}
                    placeholder="Enter a location name"
                />
                <button className="submit-button" onClick={fetchData}>
                    Submit
                </button>
            </div>
            {loading && <p className="loading">Loading...</p>}

            {error && <p className="error-message">{error}</p>}

            {showErrorGif && (
                <div className="gif-container">
                    <img
                        height={200}
                        width={350}
                        src="https://i.pinimg.com/originals/96/3f/2f/963f2ffa6f7df91ab4ae0fb4f3ee2cf9.gif"
                        alt="brahmmi failure"
                    />
                </div>
            )}

            {showSuccessGif && (
                <div className="gif-container">
                    <img
                        height={150}
                        width={250}
                        src="https://media1.tenor.com/m/gNKymZ194D8AAAAd/brahmi-king.gif"
                        alt="brahmmi success"
                    />
                </div>
            )}

            {apiData && !loading && !error && (
                <div className="weather-info">
                    <p>Temperature: <span>{(apiData.main.temp - 273.15).toFixed(2)}'C</span></p>
                    <p>Humidity: <span>{apiData.main.humidity}%</span></p>
                    <p>Wind Speed: <span>{(apiData.wind.speed * (5 / 18)).toFixed(2)} km/h</span></p>
                    <p>Brief Weather Description: <span>{apiData.weather[0].description}</span></p>
                </div>
            )}
        </div>
    );
     //   {/* <p></p>
    //        <p></p>
    //        <p></p>
    //        <p></p> */}
};

export default Home;

//temperature, humidity, wind speed, and a brief
// weather description.
