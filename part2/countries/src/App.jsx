import { useState, useEffect } from 'react'
import axios from 'axios'
import CountryDetail from './component/CountryDetail'

const CountryContent = ({countries,handleShowInformation}) => {
  if (countries.length > 10)
    return <p>Too many matches, specify another filter</p>
  if (countries.length > 1){
    return (
    <ul>
      {countries.map(country => (
        <li key={country.cca3}>{country.name.common} <button type={'button'} onClick={() => handleShowInformation(country.name.common)}>Show</button></li>
      ))}
    </ul>
    ) 
  }
  if (countries.length === 1){
    return <CountryDetail country={countries[0]} />
  }
  return null
}

const App = () => {
  const [searchText,setSearchText] = useState('')
  const [countryList,setCountryList] = useState([])

  const handleShowInformation = (countryName) => {
    setSearchText(countryName)
  }

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
      <CountryContent 
      countries={countriesToFilter}
      handleShowInformation={handleShowInformation}
      />
      
    </div>
  )
}

export default App