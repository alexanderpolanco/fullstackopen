import { useEffect, useState } from "react";
import { getInfoCountry } from "../services/countries";

const handleCountry = async (name, setCountry) => {
  const response = await getInfoCountry(name);
  const { data, found } = response;

  setCountry({
    data,
    found,
  });
};

const useCountry = (name) => {
  const [country, setCountry] = useState(null);
  useEffect(() => {
    if (!name) {
      return;
    }

    handleCountry(name, setCountry);
  }, [name]);

  return country;
};

export { useCountry };
