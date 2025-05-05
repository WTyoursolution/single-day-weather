import { useEffect, useState } from "react";

export default function Main() {
  const key = process.env.REACT_APP_WEATHER_KEY; // keep on the outside of both useEffect functions. This is the API key for OpenWeatherMap. It is stored in an environment variable for security reasons.
  const [city, setCity] = useState("New York");
  const [inputField, setInputField] = useState("");
  const [lat, setLat] = useState("");
  const [lon, setLon] = useState(""); 
  const [weather, setWeather] = useState([]); 
  const [loading, setLoading] = useState(true);
  async function getLocationData() {
    // This function fetches the location data from the API and sets it in the state.
    try {
      const response = await fetch(
        `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${key}`
      ); // This fetches the location data from the OpenWeatherMap API.

      const data = await response.json(); // This converts the response to JSON.
      setLat(data[0].lat); // This sets the latitude in the state.
      setLon(data[0].lon); // This sets the longitude in the state.
    } catch (error) {
      // This catches any errors that occur during the fetch.
      console.error(error); // This will log any errors that occur during the fetch.
    }
  }


  useEffect(() => {
    getLocationData(); // This will call the function to fetch the location data.
  }, [getLocationData]); //is a function that runs after the component is mounted. It is used to fetch data from an API and set it in the state. the comma means on page load.

  useEffect(() => {
    async function getWeatherData() {
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${key}&units=imperial`
        );
        const data = await response.json(); // This converts the response to JSON.
        setWeather(data.list); // This sets the weather data in the state.
        setLoading(false); // this tells it to stop loading after we have the data
      } catch (error) {
        console.error(error); // This will log any errors that occur during the fetch.
      }
    }

    if (lat !== "" && lon !== "") {
      getWeatherData(); // This will call the function to fetch the weather data.
    }
  }, [lat, lon]); // This is a function that runs after the component is mounted. It is used to fetch data from an API and set it in the state. The array means when lat or lon changes.

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <main className="main">
      <div>
      <label>
        City Name:
        <input
        value = {inputField}
        onChange={(e) => setInputField(e.target.value)} // This updates the city state when the input changes.
        placeholder="City" 
        type="text" 
        name="city" 
        id="city" />
      </label>
      <button onClick={() => {
        setCity(inputField);
        getLocationData();
        }}>Search</button>
      </div>
      <ul>
        {weather.map((hour) => (
          <li key={hour.dt_txt}>
            <h2>{hour.dt_txt}</h2>
            <p>
              <strong>Temp: </strong>
              {hour.main.temp}
            </p>
          </li>
        ))}
      </ul>
    </main>
  );
}
