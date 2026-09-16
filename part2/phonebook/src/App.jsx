import { useState, useEffect } from "react";
import phonebookService from "./services/phonebook";

const Filter = ({ showAll, handleFilterChange }) => (
  <>filter shown with: <input value={showAll} onChange={handleFilterChange}/></>
);

const PersonForm = ({ addPerson, newName, handleNameChange, newNumber, handleNumberChange }) => (
  <form onSubmit={addPerson}>
    <div>
      name: <input value={newName} onChange={handleNameChange} />
    </div>
    <div>
      number: <input value={newNumber} onChange={handleNumberChange} />
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
);

const Persons = ({ filterName }) => (
  <>
    {filterName.map((person) => (
      <div key={person.id || person.name}>
        {person.name} {person.number}
      </div>
    ))}
  </>
);

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [showAll, setShowAll] = useState('')

  const handleNameChange = (event) => setNewName(event.target.value)
  const handleNumberChange = (event) => setNewNumber(event.target.value)
  const handleFilterChange = (event) => setShowAll(event.target.value)
  
  
  useEffect(() => {
    phonebookService.getAll().then((initialPerson) => {
      setPersons(initialPerson)
    })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    


    const nameExists = persons.some(person => person.name.toLowerCase() === newName.trim().toLowerCase())

    if (nameExists) {
      window.alert(`${newName} is already added to phonebook`)
    } else {
      const personObject = {
        name: newName,
        number: newNumber
      }

      phonebookService.create(personObject).then((returnedPerson) => {
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
      }
      )

       
    }
  }

  const filterName = showAll === '' 
    ? persons 
    : persons.filter(person => person.name.toLowerCase().includes(showAll.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter showAll={showAll} handleFilterChange={handleFilterChange}/>

      <h2>Add a new number</h2>
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />

      <h2>Numbers</h2>
      <Persons filterName={filterName}/>
    </div>
  )
}

export default App