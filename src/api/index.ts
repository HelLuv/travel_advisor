import axios from "axios";
import GoogleMapReact from "google-map-react";

const AxiosTravel = axios.create({
  baseURL: 'https://travel-advisor.p.rapidapi.com/',
  headers: {
    'x-rapidapi-host': 'travel-advisor.p.rapidapi.com',
    'x-rapidapi-key': '02abd1d46emsh453ead362e5732ep11ecd1jsnb41fc4413ba0',
    // 'x-rapidapi-key': '02abd1d46emsh453ead362e5732ep11ecd1jsnb41fc441346h',
  }
});

export const getPlacesData = async (type: string, ne: GoogleMapReact.Coords, sw: GoogleMapReact.Coords) => {
  try {
    const {data: {data}} = await AxiosTravel.get(`${type}/list-in-boundary`, {
      params: {
        bl_latitude: sw?.lat,
        tr_latitude: ne?.lat,
        bl_longitude: sw?.lng,
        tr_longitude: ne?.lng,
      },
    });

    return data;
  } catch (error) {
    console.log('getPlacesData >>> ', {error})
  }
}

const AxiosWeather = axios.create({
  baseURL: 'https://community-open-weather-map.p.rapidapi.com/',
  headers: {
    'x-rapidapi-host': 'community-open-weather-map.p.rapidapi.com',
    'x-rapidapi-key': '876800fa49msh20aa13767644fd1p15b096jsn00c3efe3747b'
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