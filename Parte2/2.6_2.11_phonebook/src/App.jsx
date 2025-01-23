import { useState, useEffect } from "react";
import Persons from "./Persons";
import Form from "./Form";
import Filter from "./Filter";
import axios from 'axios'

const App = () => {
  const [persons, setPersons] = useState([]);
  const [personsFiltered, setPersonsFiltered] = useState([]);
  const [filter, setFilter] = useState("");
  const [newName, setNewName] = useState("");
  const [newNumber, setnewNumber] = useState("");

  function isInclude(name) {
    return persons.some((person) => person.name.toLowerCase() === name.toLowerCase());
  }

  const handdleChangeFilter = (e) => {
    setFilter(e.target.value);
    setPersonsFiltered(
      persons.filter((person) =>
        person.name.toLowerCase().includes(e.target.value.toLowerCase())
      )
    );
  };

  const handdleChangeName = (e) => {
    setNewName(e.target.value);
  };

  const handdleChangeNumber = (e) => {
    setnewNumber(e.target.value);
  };

  const handdleSubmit = (e) => {
    e.preventDefault();
    if (isInclude(newName)) {
      alert(`${newName} is already added to phonebook`);
      return;
    }
    setPersons([...persons, { name: newName, number: newNumber }]);
    setNewName("");
    setnewNumber("");
  };

  useEffect(() => {
    axios
      .get("http://localhost:3001/persons")
      .then((response) => {
        setPersons(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} handdleChangeFilter={(e) => handdleChangeFilter(e)} />
      <h2>add a new</h2>
      <Form
        newName={newName}
        newNumber={newNumber}
        handdleChangeName={handdleChangeName}
        handdleChangeNumber={handdleChangeNumber}
        handdleSubmit={handdleSubmit}
      />
      <h2>Numbers</h2>
      {filter.length > 0 ? (
        <Persons persons={personsFiltered} />
      ) : (
        <Persons persons={persons} />
      )}
    </div>
  );
};

export default App;