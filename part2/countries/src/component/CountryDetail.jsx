import { useState, useEffect } from 'react'
import axios from 'axios'

const CountryDetail = ({ country }) => {
  const [weather, setWeather] = useState(null)
  const capital = country.capital?.[0]
  const apiKey = import.meta.env.VITE_SOME_KEY

  useEffect(() => {
    if (capital) {
      axios
        .get(`https://api.openweathermap.org/data/2.5/weather?q=${capital}&units=metric&appid=${apiKey}`)
        .then(response => {
          setWeather(response.data)
        })
        .catch(error => {
          console.error("Error al obtener el clima:", error)
        })
    }
  }, [capital, apiKey])

  return (
    <div>
      <h2>{country.name.common}</h2>
      <p>capital {capital}</p>
      <p>area {country.area}</p>

      <h3>languages:</h3>
      <ul>
        {Object.values(country.languages || {}).map(lang => (
          <li key={lang}>{lang}</li>
        ))}
      </ul>

      <img src={country.flags.png} alt={`Flag of ${country.name.common}`} width="150" />

      {weather && (
        <div>
          <h3>Weather in {capital}</h3>
          <p>temperature {weather.main.temp} Celsius</p>
          <img 
            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} 
            alt={weather.weather[0].description} 
          />
          <p>wind {weather.wind.speed} m/s</p>
        </div>
      )}
    </div>
  )
}

export default CountryDetail