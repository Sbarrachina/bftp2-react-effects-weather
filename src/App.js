import './App.css';
import {useEffect, useState} from "react";
<<<<<<< HEAD
import miClave from './.env';

=======
>>>>>>> dcc4cccbfc8f763dd4237cfebe6baa78937ec3b9
function App() {
    const WEATHER_API = "https://weatherdbi.herokuapp.com/data/weather/";
    const [count, setCount] = useState(0);
    const [drawing, setDrawing] = useState("");
    const [title, setTitle] = useState("");
    const [title2, setTitle2] = useState("");
    const [titleTomorrow, setTitleTomorrow] = useState("");
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
    function updateWeatherData5Days( data ) {
        const temperatureInKelvin = data.list[0].main.temp
        const temperatureInCelsiusTomorrow = (data.list[3].main.temp - 273).toFixed(0)
        const tempInCelsius = (temperatureInKelvin - 273).toFixed(0);
        setTitle2(`Buenos días, hoy tenemos ${tempInCelsius} ℃ grados en Barcelona 😁`)
        setTitleTomorrow(`Buenos días, mañana hará ${temperatureInCelsiusTomorrow} ℃ grados en Barcelona 🥶`)
    }

    useEffect( () => {
        fetch(WEATHER_API + cityName) // saco el JSON de datos
            .then(r => r.json()) //
            .then( updateWeatherData )
    }, [cityName]);

<<<<<<< HEAD
    useEffect( () => {
        fetch( WEATHER_API5Dias)
            .then(r => r.json())

    },[]);
=======
    const [weather, setWeather] = useState([{temp: ''}]);

    useEffect(()=> {
        fetch("https://community-open-weather-map.p.rapidapi.com/forecast?q=barcelona%2Ces", {
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "community-open-weather-map.p.rapidapi.com",
                "x-rapidapi-key": "c7a7120e8bmsh2528663f9e31783p14d3c6jsncb74e94eac25"
            }
        })  .then(response => response.json())
            .then( updateWeatherData5Days )
            .then(response => {
            console.log(response);
        })
    }, []);

>>>>>>> dcc4cccbfc8f763dd4237cfebe6baa78937ec3b9

    useEffect( () => console.log(
        "Hola, llevamos "+ count),
        [count]);

    useEffect(updateDrawing, [count]);

    function increaseCounter() {
        if (count < 5) {
            setCount(count + 1);
        }
        else setCount(0)
    }

    return (
        <div className="App">
            <h1>{ title }</h1>
            <h2>{ title2 }</h2>
            <h3>{ titleTomorrow }</h3>
            <img src={icon} alt="weather icon"/>
            <input type={"text"} onChange={(e) => setCityName(e.target.value) } />
            <p> {`La cuenta es ${count}`}</p>
            <p> { drawing } </p>
            <button onClick={increaseCounter}>Incrementar</button>
        </div>
    );
}

export default App;
