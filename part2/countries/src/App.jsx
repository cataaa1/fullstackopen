import { useState, useEffect } from 'react'
import axios from 'axios'

const CountryContent = ({countries}) => {
  if (countries.length > 10)
    return <p>Too many matches, specify another filter</p>
  if (countries.length > 1){
    return (
    <ul>
      {countries.map(country => (
        <li key={country.cca3}>{country.name.common}</li>
      ))}
    </ul>
    ) 
  }
  if (countries.length === 1){
    const country = countries[0]
    return (
        <div>
        
          <h2>{country.name.common}</h2>
          <p>capital {country.capital?.[0]}</p>
          <p>area {country.area}</p>

          <h3>languages:</h3>
          <ul>
            {Object.values(country.languages || {}).map(lang => (<li key={lang}>{lang}</li>))}
          </ul>
      
         <img src={country.flags.png} alt={`Flag of ${country.name.common}`} width="150" />
        
        </div>
    )
  }
  return null
}

const App = () => {
  const [searchText,setSearchText] = useState('')
  const [countryList,setCountryList] = useState([])

  useEffect(() => {
    console.log('effect run, fetching countries')
    axios
    .get('https://studies.cs.helsinki.fi/restcountries/api/all')
    .then(response => {
      setCountryList(response.data)
      console.log('Paises cargados: ', response.data.length)
    })

  }, [])

  const countriesToFilter = searchText === '' ? [] : countryList.filter(country => country.name.common.toLowerCase().includes(searchText.toLowerCase()))

  const handleSearchChange = (event) => {setSearchText(event.target.value)}

  

  return (
    <div>

      find countries: <input value={searchText} onChange={handleSearchChange}/>
      <CountryContent countries={countriesToFilter}/>
      
    </div>
  )
}

export default App