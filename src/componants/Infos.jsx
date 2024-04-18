import PropTypes from "prop-types";
function Infos({
  pays,
  capital,
  monnaie,
  abrev,
  abrevMaj,
  time,
  temp,
  exchangeUSD,
  exchangeEUR,
  dayOff,
}) {
  return (
    <>
      {pays ? (
        <>
          <h5>Pays:</h5>
          <p>
            {pays}, {abrevMaj}
          </p>
          <img
            src={`https://flagcdn.com/${abrev}.svg`}
            width="30"
            alt={abrev}
          />
          <h5>capital :</h5>
          <p> {capital}</p>
          <h5>What is the weather actually ?</h5>
          <p>
            {time} for {temp}°
          </p>
          <h5>Change :</h5>
          <p>
            1 {monnaie} = {exchangeUSD} USD / {exchangeEUR} EUR
          </p>
          <h5>Days OFF :</h5>
          <span>
            {dayOff.map((e, index) => (
              <div key={index}>
                <p>
                  Le {e.date} : {e.name} ({e.localName})
                </p>
              </div>
            ))}
          </span>
        </>
      ) : (
        <p>je l avais pas vu venir celle la</p>
      )}
    </>
  );
}

Infos.propTypes = {
  pays: PropTypes.string,
  capital: PropTypes.string,
  monnaie: PropTypes.string,
  abrev: PropTypes.string,
  abrevMaj: PropTypes.string,
  time: PropTypes.string,
  temp: PropTypes.number,
  exchangeUSD: PropTypes.number,
  exchangeEUR: PropTypes.number,
  dayOff: PropTypes.array,
};

export default Infos;
