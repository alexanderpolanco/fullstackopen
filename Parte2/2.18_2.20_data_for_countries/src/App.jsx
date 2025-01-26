import { useState, useEffect } from "react";
import ListCountries from "./ListCountries";
import Filter from "./Filter";
import { getAll } from "./services/countriesServices";
import Details from "./Details";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [countriesFiltered, setCountriesFiltered] = useState([]);
  const [filter, setFilter] = useState("");
  const [countrieSelected, setCountrySelected] = useState(null);

  const handleChangeFilter = (e) => {
    setFilter(e.target.value);
    setCountrySelected(null);
    setCountriesFiltered(
      countries.filter((countrie) =>
        countrie.name.common
          .toLowerCase()
          .includes(e.target.value.toLowerCase())
      )
    );
  };

  const handleShow = (countrie) => {
    setCountrySelected(countrie);
  };

  useEffect(() => {
    getAll()
      .then((countries) => {
        setCountries(countries);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div>
      <Filter
        filter={filter}
        handleChangeFilter={(e) => handleChangeFilter(e)}
      />
      {countriesFiltered.length > 10 && (
        <div>Too many matches, specify another filter</div>
      )}
      {countriesFiltered.length > 1 && countriesFiltered.length < 11 && (
        <ListCountries countries={countriesFiltered} handleShow={handleShow} />
      )}

      {countriesFiltered.length === 1 && (
        <Details
          name={countriesFiltered[0].name.common}
          capital={countriesFiltered[0].capital}
          area={countriesFiltered[0].area}
          languages={countriesFiltered[0].languages}
          flags={countriesFiltered[0].flags}
        />
      )}
      {countrieSelected && (
        <Details
          name={countrieSelected.name}
          capital={countrieSelected.capital}
          area={countrieSelected.area}
          languages={countrieSelected.languages}
          flags={countrieSelected.flags}
        />
      )}
    </div>
  );
};

export default App;
