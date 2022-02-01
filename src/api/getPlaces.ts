import axios from "axios";
import GoogleMapReact from "google-map-react";

const AxiosTravel = axios.create({
  baseURL: 'https://travel-advisor.p.rapidapi.com/',
  headers: {
    'x-rapidapi-host': 'travel-advisor.p.rapidapi.com',
    'x-rapidapi-key': process.env.REACT_APP_RAPID_API_TRAVEL_API_KEY ?? '',
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
