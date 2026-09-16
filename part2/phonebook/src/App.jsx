import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [showAll, setShowAll] = useState('')

  const handleNameChange = (event) => setNewName(event.target.value)
  const handleNumberChange = (event) => setNewNumber(event.target.value)
  const handleFilterChange = (event) => setShowAll(event.target.value)

  const addPerson = (event) => {
    event.preventDefault()

      const nameExists = persons.some(
      person => person.name.toLowerCase() === newName.trim().toLowerCase()
    )

      if (nameExists)
        window.alert(newName + ' is already added to phonebook')
      else{
        const personObject = {
          name: newName,
          number: newNumber
        }
        setPersons(persons.concat(personObject))
        setNewName('')
        setNewNumber('')
      }
   
  }

  const filterName = showAll === '' ? persons: persons.filter(person => person.name.toLowerCase().includes(showAll.toLowerCase()))


  return (
    <div>
      <h2>Phonebook</h2>
      filter shown with: <input value={showAll} onChange={handleFilterChange}/>

      <h2>Add a new number</h2>
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
      {filterName.map(person => (
        <p key={person.id}>{person.name}  {person.number}</p>
      ))}
    </div>
  )
}


export default App