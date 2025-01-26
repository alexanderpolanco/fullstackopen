import { useState, useEffect } from "react";
import Persons from "./Persons";
import Form from "./Form";
import Filter from "./Filter";
import { getAll, create, update, remove } from "./services/phoneBookServices";
import Notification from "./notification/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [personsFiltered, setPersonsFiltered] = useState([]);
  const [filter, setFilter] = useState("");
  const [newName, setNewName] = useState("");
  const [newNumber, setnewNumber] = useState("");
  const[message, setMessage] = useState({type: null, message: null});

  function findPerson(name) {
    return persons.find((person) => person.name === name);
  }

  const handleChangeFilter = (e) => {
    setFilter(e.target.value);
    setPersonsFiltered(
      persons.filter((person) =>
        person.name.toLowerCase().includes(e.target.value.toLowerCase())
      )
    );
  };

  const handleChangeName = (e) => {
    setNewName(e.target.value);
  };

  const handleChangeNumber = (e) => {
    setnewNumber(e.target.value);
  };

  const handelMessage = (message) => {
    setMessage(message);
    setTimeout(() => {
      setMessage({ type: null, message: null });
    }, 5000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const person = findPerson(newName);
    if (person) {
      const confirm = window.confirm(
        `${newName} is already added to phonebook, relace old number with a new one?`
      );
      if (confirm) {
        const personUpdated = { ...person, number: newNumber };
        update(person.id, personUpdated)
          .then((response) => {
            const personsFiltered = persons.filter(
              (person) => person.id !== personUpdated.id
            );
            setPersons([...personsFiltered, { ...personUpdated }]);
            handelMessage({type: "success", message: `Updated ${personUpdated.name}`})
          })
          .catch((error) => {
            handelMessage({type: "error", message: `Information of ${newName} has alredy removed from server`})
            console.log(error);
          });
      }
    } else {
      create({ name: newName, number: newNumber }).then((response)=>{
        setPersons([...persons, { name: newName, number: newNumber }]);
        handelMessage({type: "success", message: `Added ${newName}`})
        
      }).catch ((error)=>{
        handelMessage({type: "error", message: `Error`})
      });
    }
    setNewName("");
    setnewNumber("");
  };

  const handleDelete = (id) => {
    const person = persons.find((person) => person.id === id);
    const confirn = window.confirm(
      `Are you sure you want to delete ${person.name}?`
    );
    if (confirn) {
      remove(id);
      const newPersons = persons.filter((person) => person.id !== id);
      setPersons(newPersons);
    }
  };

  useEffect(() => {
    getAll()
      .then((person) => {
        setPersons(person);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [persons]);

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} />

      <Filter
        filter={filter}
        handleChangeFilter={(e) => handleChangeFilter(e)}
      />
      <h2>add a new</h2>
      <Form
        newName={newName}
        newNumber={newNumber}
        handleChangeName={handleChangeName}
        handleChangeNumber={handleChangeNumber}
        handleSubmit={handleSubmit}
      />
      <h2>Numbers</h2>
      {filter.length > 0 ? (
        <Persons persons={personsFiltered} handleDelete={handleDelete} />
      ) : (
        <Persons persons={persons} handleDelete={handleDelete} />
      )}
    </div>
  );
};

export default App;
