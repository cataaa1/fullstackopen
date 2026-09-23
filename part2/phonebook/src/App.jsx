import { useState, useEffect } from "react";
import phonebookService from "./services/phonebook.js";
import './index.css'

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


const Persons = ({ filterName, handleDelete }) => (
  <>
    {filterName.map((person) => (
      <div key={person.id || person.name}>
        {person.name} {person.number} 
        <button onClick ={() => handleDelete(person.id,person.name)}>delete</button>
      </div>
    ))}
  </>
);

const Notification = ({ message, type }) => {
  if (message === null) {
    return null
  }

  return (
    <div className={type}>
      {message}
    </div>
  )
}



const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [showAll, setShowAll] = useState('')
  const [notificationMessage, setNotificationMessage] = useState(null)
  const [notificationType, setNotificationType] = useState('success')

  const handleNameChange = (event) => setNewName(event.target.value)
  const handleNumberChange = (event) => setNewNumber(event.target.value)
  const handleFilterChange = (event) => setShowAll(event.target.value)
  
  const notify = (message, type = 'success') => {
    setNotificationMessage(message)
    setNotificationType(type)
    setTimeout(() => {
      setNotificationMessage(null)
    }, 5000)
  }
  
  useEffect(() => {
    phonebookService.getAll().then((initialPerson) => {
      setPersons(initialPerson)
    })
  }, [])

  const handleDeleteOf = (id,name) => {
    if (window.confirm(`Delete ${name}?`)){
      phonebookService
      .remove(id)
      .then(() => {
        setPersons(persons.filter(person => person.id !== id))
      })
      .catch(() => {
        notify(`Information of ${name} has already been removed from server`, 'error')
        setPersons(persons.filter(person => String(person.id) !== String(id)))
      })
    }
  }

  const addPerson = (event) => {
    event.preventDefault()
  
    const existingPerson = persons.find(
      person =>
        person.name.toLowerCase() === newName.trim().toLowerCase()
    )
  
    if (existingPerson) {
      const confirmUpdate = window.confirm(
        `${newName} is already added to phonebook, replace the old number with a new one?`
      )
  
      if (confirmUpdate) {
        const updatedPerson = {
          ...existingPerson,
          number: newNumber
        }
  
        phonebookService
          .update(existingPerson.id, updatedPerson)
          .then(returnedPerson => {
            setPersons(
              persons.map(person =>
                person.id !== existingPerson.id
                  ? person
                  : returnedPerson
              )
            )
  
            setNewName('')
            setNewNumber('')
          })
      }
  
      return
    }
  
    const personObject = {
      name: newName,
      number: newNumber
    }
  
    phonebookService
  .create(personObject)
  .then(returnedPerson => {
    setPersons(persons.concat(returnedPerson))
    setNewName('')
    setNewNumber('')
    notify(`Added '${returnedPerson.name}'`, 'success')
  })
  .catch(error => {
    notify(error.response.data.error, 'error')
  })
  }

  const filterName = showAll === '' ? persons : persons.filter(person => person.name.toLowerCase().includes(showAll.toLowerCase()))

  return (
    <div>
      <h1>Catalina</h1>
      <h2>Phonebook</h2>
      <Notification message={notificationMessage} type={notificationType} />
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
      <Persons filterName={filterName} handleDelete={handleDeleteOf}/>
    </div>
  )
}

export default App