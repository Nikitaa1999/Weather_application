import axios from 'axios';
import { useState, useEffect } from 'react';
import "./Weather.css"

export default function Weather(){
    const[input, setInput]=useState("");
    const[changed, setChanged] = useState(true);
    const[temp, setTemp] = useState(0);
    const[humidity, setHumidity] = useState(0);
    const[condition, setCondition] = useState("");
    const[windSpeed, setWindSpeed] = useState(0);
    const [loading, setLoading] =useState(false);
    const [clicked,setClicked]= useState(false);


    useEffect(()=>{
        if(input){
        setLoading(true);
       const url="https://api.weatherapi.com/v1/current.json";
       const api_key="500a8792bd594f65bd6192109241403"

        axios.get(url,{
        params:{
            key:api_key,
            q: input,
        },
       })
       .then((res)=>{
        console.log(res);
        setTemp(res.data.current.temp_c);
        setHumidity(res.data.current.humidity);
        setCondition(res.data.current.condition.text);
        setWindSpeed(res.data.current.wind_kph);

       })
       .catch((error)=>{
       // console.log("There was this error=>",error)
        if(error.response.status===400){
            alert("Failed to fetch weather data");
        }
       })
       .finally(
        setLoading(false)
       )
    }
    },[changed])


    return(
        <div>
            <input
                type="text"
                placeholder="Enter city name"
                value={input}
                onChange={(event) => setInput(event.target.value)}
            />
            <button onClick={()=>{setChanged(!changed)
                            setClicked(true)
                }}>Search</button>
            {loading? <div><p>Loading data...</p></div>: <></>}

            {clicked?
            <div class="weather-cards">
            <div class="weather-card">
                <h3>Temperature</h3>
                <p>{temp}&deg;C</p>
            </div>
            <div class="weather-card">
                <h3>Humidity</h3>
                <p>{humidity}%</p>
            </div>
            <div class="weather-card">
                <h3>Condition</h3>
                <p>{condition}</p>
            </div> 
            <div class="weather-card">
                <h3>Windspeed</h3>
                <p>{windSpeed} kph</p>
            </div> 

            </div>:
            <></>
            }

           
        </div>
    )
} 