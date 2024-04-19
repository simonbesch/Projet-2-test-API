/* eslint-disable react/jsx-key */
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import Infos from "./componants/Infos";
import paiss from "./data.js";

import "./App.css";

function App() {
  /**
   * Permet de rendre la vu en fonction de ses 2 éléments
   */
  const [isLoading, setIsLoading] = useState(true);
  const [errorSearch, setErrorSearch] = useState(true);
  const [goSearch, setGoSearch] = useState(false);

  const [statePays, setStatePays] = useState("");
  const [stateCapital, setStateCapital] = useState("");
  const [stateMonaie, setStateMonaie] = useState("");
  const [stateAbrev, setStateAbrev] = useState("");
  const [stateApiTime, setStateApiTime] = useState("");

  const [time, setTime] = useState([]);
  const [dayOff, setDayOff] = useState([]);
  const [exchange, setExchange] = useState([]);
  const [timeZone, setTimeZone] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");

  /** J'ai trouvé l'astuce ici => https://stackoverflow.com/questions/55075604/react-hooks-useeffect-only-on-update */
  const isInitialMount = useRef(true);

  /**
   * Permet de récupérer les jours fériés d'un pays
   */
  const getPublicHolidays = () => {
    axios
      .get(`https://date.nager.at/api/v3/PublicHolidays/2024/${stateAbrev}`)
      .then(function (response) {
        setDayOff(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  /**
   * Permet de récuperer la time zone d'un pays
   */
  const getTime = () => {
    axios
      .get(`http://worldtimeapi.org/api/timezone/${stateApiTime}`)
      .then(function (response) {
        setTimeZone(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  /**
   * Permet de récuperer le temps d'un pays
   */
  const getWeather = (KEYWEATHER) => {
    axios
      .get(
        `http://api.openweathermap.org/data/2.5/weather?q=${stateCapital}&appid=${KEYWEATHER}`
      )
      .then(function (response) {
        setTime(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  /**
   * Permet de connaitre le taux de change d'un pays
   */
  const getExchange = (KEYCHANGE) => {
    axios
      .get(
        `https://v6.exchangerate-api.com/v6/${KEYCHANGE}/latest/${stateMonaie}`
      )
      .then(function (response) {
        setExchange(response.data);
        setIsLoading(false);
        setErrorSearch(false);
      })
      .catch(function (error) {
        console.log(error);
        setErrorSearch(true);
      });
  };

  useEffect(() => {
    const KEYWEATHER = "";
    const KEYCHANGE = "";

    /**
     * Ensuite, à partir de 2eme render, j'éxécute les appels des fonctions
     * - getPublicHolidays
     * - getWeather
     * - getExchange
     */
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      getPublicHolidays();
      getTime();
      getWeather(KEYWEATHER);
      getExchange(KEYCHANGE);
    }
    /** Et je fait ça, à chaque fois que `goSearch` change.
     * Celui ci change, dans la fonction `handleSubmit` avec setGoSearch(!goSearch)
     */
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [goSearch]);

  const handleSubmit = (event) => {
    event.preventDefault();

    paiss.map(
      (data) => (
        setStatePays(data.pais[`${searchTerm}`]?.countrie),
        setStateCapital(data.pais[`${searchTerm}`]?.capital),
        setStateMonaie(data.pais[`${searchTerm}`]?.exchange),
        setStateAbrev(data.pais[`${searchTerm}`]?.abrev),
        setStateApiTime(data.pais[`${searchTerm}`]?.apitime)
      )
    );

    setGoSearch(!goSearch);
  };

  /**
   * Permet de faire une liste d'options
   */

  const option = Object.keys(paiss[0].pais).map((data, index) => (
    <option value={data} key={index}>
      {data}
    </option>
  ));

  const twoFunc = (event) => setSearchTerm(event.target.value);

  return (
    <>
      <form onSubmit={handleSubmit}>
        <button type="submit">Search</button>
        <select name="countrie" id="" onChange={twoFunc}>
          <option value="">--- choose your country ---</option>
          {option}
        </select>
      </form>
      {isLoading ? (
        <p>En attente de votre recherche</p>
      ) : errorSearch ? (
        <p>Nothing here :)</p>
      ) : (
        <Infos
          pays={statePays}
          capital={stateCapital}
          monnaie={stateMonaie}
          abrev={stateAbrev}
          timeZone={timeZone.datetime}
          abrevMaj={time?.sys.country}
          time={time?.weather[0].description}
          icon={time?.weather[0].icon}
          wind={time?.wind.speed}
          temp={Math.floor(time?.main.temp - 273.15)}
          exchangeUSD={exchange?.conversion_rates.USD}
          exchangeEUR={exchange?.conversion_rates.EUR}
          dayOff={dayOff}
        />
      )}
    </>
  );
}

export default App;
