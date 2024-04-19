import PropTypes from "prop-types";
function Infos({
  pays,
  capital,
  monnaie,
  abrev,
  timeZone,
  abrevMaj,
  time,
  icon,
  wind,
  temp,
  exchangeUSD,
  exchangeEUR,
  dayOff,
}) {
  const [timeDate, timeRest] = timeZone.split("T");
  const [timeHeure, timeRestTwo] = timeRest.split(".");
  return (
    <>
      {pays ? (
        <>
          <h2>Pays:</h2>
          <p>
            {pays}, {abrevMaj}
          </p>
          <img
            src={`https://flagcdn.com/${abrev}.svg`}
            width="30"
            alt={abrev}
          />
          <h2>Capital :</h2>
          <p> {capital}</p>
          <h2>What is the weather actually ?</h2>
          <p>{time}</p>
          <img
            src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
            alt=""
          />
          <p>for {temp}°C</p>
          <p>air speed : {wind} m/h</p>
          <h2>Whats time is it ?</h2>
          <p>
            {timeHeure} the {timeDate}{" "}
            <span style={{ display: "none" }}>{timeRestTwo}</span>
          </p>
          <h2>Change :</h2>
          <p>
            1 {monnaie} = {exchangeUSD} USD / {exchangeEUR} EUR
          </p>
          <h2>Days OFF :</h2>
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
  timeZone: PropTypes.string,
  abrevMaj: PropTypes.string,
  time: PropTypes.string,
  icon: PropTypes.string,
  wind: PropTypes.number,
  temp: PropTypes.number,
  exchangeUSD: PropTypes.number,
  exchangeEUR: PropTypes.number,
  dayOff: PropTypes.array,
};

export default Infos;
