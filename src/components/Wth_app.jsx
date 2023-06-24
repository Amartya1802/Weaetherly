import React, { useEffect, useState } from "react";
import "./css/Style.css";
import TextField from '@mui/material/TextField';
import RoomTwoToneIcon from '@mui/icons-material/RoomTwoTone';



const Tempapp = () => {

    const [city, setCity] = useState(null);
    const [search, setSearch] = useState("Mumbai");


    const getwh = async () => {
        try{
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${search}&units=metric&appid=fb551cdd8cbcad24f5720cb3f5388d88`;
            const response = await fetch(url);
            const resJson = await response.json();
            setCity(resJson);
            console.log(resJson);
        }
        catch (err){
            console.log('No data found: ', err);
        }
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
          handleSearch();
        }
    };

    const handleSearch = () => {
        getwh(city)
    };

    useEffect( () => {
        getwh("Mumbai")
    }, [])

    return(
        <>
            <div className="card">
                <div className="inputData">
                    
                    <TextField 
                        sx = {{
                            width: 210,
                            "& .MuiInputBase-root" :{
                                height: 47
                            }
                        }}
                        id="outlined-basic" 
                        label="Location" 
                        variant="outlined" 
                        value = {search}
                        onKeyPress={handleKeyPress}
                        onChange={(event) => {
                            setSearch(event.target.value)
                        }}
                    />
                    <button className="search-btn" onClick={handleSearch}>Search</button>
                </div>

                {
                    !city ? (<p>Error: No Data Found</p>) : 
                    (
                        <div className="info">
                            <div className="location">
                                <i className="icon"> 
                                    <RoomTwoToneIcon 
                                        sx = {{
                                            fontSize: '50px'
                                        }}
                                    /> 
                                </i>
                                <h1 className="place_name">{search}</h1>
                            </div>
                            <div className="weather">
                                <div>
                                    <h1 className="main_tmp">{Math.round(city.main.temp)} ºC</h1>
                                </div>
                                <div>
                                    <img alt="Weather icon" className="wh_icon" src={`icons/${city.weather[0].icon}.png`} />
                                    <h2 className="wh_type">{city.weather[0].main}</h2>
                                </div>
                                
                            </div>
                            <div className="wind-humid">
                                <div className="wind">
                                    <img alt="wind-icon" className="wind_icon" src="icons/wind.png" />
                                    <p className="wind_det">Wind Speed <br />{city.wind.speed} km/h</p>
                                </div>
                                <div className="humidity">
                                    <img alt="humid-icon" className="humid_icon" src="icons/humidity.png" />
                                    <p className="humid_det">Humidity<br />{city.main.humidity} %</p>
                                </div>
                            </div>
                        </div>
                    )
                }
            </div>
        </>
    )
}
export default Tempapp;

