import axios from "axios";

const getInfoCountry = async (name) => {
  try {
    const response = await axios.get(
      `https://studies.cs.helsinki.fi/restcountries/api/name/${name}`
    );
    const data = {
      name: response.data.name.common,
      capital: response.data.capital[0],
      population: response.data.population,
      flag: response.data.flags.png,
    };
    return {
      data,
      found: true,
    };
  } catch (error) {
    return { data: {}, found: false };
  }
};

export { getInfoCountry };
