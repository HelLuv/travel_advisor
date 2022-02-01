import axios from "axios";

const AxiosWeather = axios.create({
  baseURL: 'https://community-open-weather-map.p.rapidapi.com/',
  headers: {
    'x-rapidapi-host': 'community-open-weather-map.p.rapidapi.com',
    'x-rapidapi-key': process.env.REACT_APP_RAPID_API_WEATHER_API_KEY ?? ""
  }
});

export const getWeatherData = async (lon: string, lat: string) => {
  try {
    const {data} = await AxiosWeather.get(`find`, {
      params: {
        lon,
        lat
      }
    })

    return data;
  } catch (error) {
    console.log('getWeatherData >>> ', {error})
  }
}