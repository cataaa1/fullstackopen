import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const addPerson = (event) => {
    event.preventDefault()

    const personObject = {
      name: newName,
      number: newNumber
    }

    let bool = false

    for(let i=0;i<persons.length;i++){
      if (persons[i].name === newName){
        bool = true
    }
    }
      if (bool)
        window.alert(newName + ' is already added to phonebook')
      else
        setPersons(persons.concat(personObject))
  
    setNewName('')
    setNewNumber('')
  }


  return (
    <div>
      <h2>Phonebook</h2>
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
      <h2>Numbers</h2>
      {persons.map(person => (
        <p key={person.name}>{person.name}  {person.number}</p>
      ))}
    </div>
  )
}


export default App