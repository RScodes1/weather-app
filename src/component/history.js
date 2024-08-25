import React from "react";
import { useState, useEffect } from "react";
import './history.css';

const History = () => {

 
  const [weatherHistory, setWeatherHistory] = useState([]);

    useEffect(() => {
        const storedHistory = JSON.parse(localStorage.getItem("weatherHistory")) || [];
        setWeatherHistory(storedHistory);
    }, []);

        return (
            <div>
                <h1>Weather History</h1>
                {weatherHistory.length === 0 ? (
                    <p>No history available.</p>
                ) : (
                    <div className="history-container">
                        {weatherHistory.map((data, index) => (
                            <div key={index} className="weather-card">
                                <p> <span style={{textDecoration: "underline"}} >City</span> : <span>{data.name}</span></p>
                                <p> <span style={{textDecoration: "underline"}} >Temperature</span> : <span>{(data.main.temp - 273.15).toFixed(2)}'C</span></p>
                                <p> <span style={{textDecoration: "underline"}} >Humidity</span> : <span>{data.main.humidity}%</span></p>
                                <p> <span style={{textDecoration: "underline"}} >Wind Speed</span> : <span>{(data.wind.speed * (5 / 18)).toFixed(2)} km/h</span></p>
                                <p> <span style={{textDecoration: "underline"}} >Weather Description</span> : the weather has been in a condition as <span>{data.weather[0].description}</span></p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        );
     
}

export default History;