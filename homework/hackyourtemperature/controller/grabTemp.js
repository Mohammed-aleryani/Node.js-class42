import fetch from "node-fetch";
import apiKey from "../sources/keys.js";
const apiBaseUrl="https://api.openweathermap.org";

const grabTemp = async (req, res) => {
  const cityName = req.body.cityName;
  const longestCityNameLength = 17;

  if (!cityName) {
    return res.status(400).json({ error: "Please write a city name!" });
  }

  if (cityName.length > longestCityNameLength) {
    return res
      .status(400)
      .json({ error: "Please enter only a city name!" });
  }

  try {
    const locationResponse = await fetch(
      `${apiBaseUrl}/geo/1.0/direct?q=${cityName}&limit=1&appid=${apiKey}`
    );

    const [location] = await locationResponse.json();

    if (!location) {
      return res
        .status(400)
        .json({ weatherText: `${cityName} is not found!` });
    }

    const { name, lat, lon } = location;

    const weatherResponse = await fetch(
      `${apiBaseUrl}/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`
    );

    const weatherData = await weatherResponse.json();

    const temperature = Math.round(weatherData.main.temp);

    return res
      .status(200)
      .json({ "City name": name, Temperature: `${temperature} C` });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Oops something went wrong!" });
  }
};

export default grabTemp;
