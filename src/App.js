import './App.css';
import {useEffect, useState} from "react";
import miClave from './.env';

function App() {
    const WEATHER_API = "https://weatherdbi.herokuapp.com/data/weather/";
    const WEATHER_API5Dias = { url:"https://community-open-weather-map.p.rapidapi.com/forecast?q=barcelona%2Ces",
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "community-open-weather-map.p.rapidapi.com",
            "x-rapidapi-key": "c7a7120e8bmsh2528663f9e31783p14d3c6jsncb74e94eac25"
        }
    };


    const [count, setCount] = useState(0);
    const [drawing, setDrawing] = useState("");
    const [title, setTitle] = useState("");
    const [icon, setIcon] = useState("");
    const [cityName, setCityName] = useState("barcelona");
    const [cityFiveDays, setCityFiveDays] = useState("");

    function updateDrawing() {
        if (count === 0) {
            setDrawing("✨");
        } else {
            setDrawing("⭐️".repeat(count));
        }
    }

    function updateWeatherData( data ) {
        const temperature = data.currentConditions.temp.c
        const iconURL = data.currentConditions.iconURL
        setTitle(`Buenos días, hoy tenemos ${temperature} grados en ${cityName}`)
        setIcon(iconURL)
    }

    useEffect( () => {
        fetch(WEATHER_API + cityName) // saco el JSON de datos
            .then(r => r.json()) //
            .then( updateWeatherData )
    }, [cityName]);

    useEffect( () => {
        fetch( WEATHER_API5Dias)
            .then(r => r.json())

    },[]);

    useEffect( () => console.log(
        "Hola, llevamos "+ count),
        [count]);

    useEffect(updateDrawing, [count]);

    function increaseCounter() {
        setCount(count + 1);
    }

    return (
        <div className="App">
            <h2>{ title }</h2>
            <img src={icon} alt="weather icon"/>
            <input type={"text"} onChange={(e) => setCityName(e.target.value) } />
            <p> {`La cuenta es ${count}`}</p>
            <p> { drawing } </p>
            <p>{cityFiveDays}</p>
            <button onClick={increaseCounter}>Incrementar</button>
        </div>
    );
}

export default App;
