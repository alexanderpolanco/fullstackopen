export default function ListCountries({ countries, handleShow }) {
  return countries.map((countri) => {
    const {
      name: { common: name },
      capital,
      area,
      languages,
      flags,
    } = countri;
    const selected = { name, capital, area, languages, flags };
    return (
      <div key={countri.name.common}>
        {`${countri.name.common} `}
        <button onClick={() => handleShow(selected)}>Show</button>
      </div>
    );
  });
}
