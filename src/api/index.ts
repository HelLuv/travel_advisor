import axios from "axios";
import GoogleMapReact from "google-map-react";

const Axios = axios.create({
  baseURL: 'https://travel-advisor.p.rapidapi.com/',
  headers: {
    'x-rapidapi-host': 'travel-advisor.p.rapidapi.com',
    'x-rapidapi-key': '02abd1d46emsh453ead362e5732ep11ecd1jsnb41fc4413ba0',
    // 'x-rapidapi-key': '02abd1d46emsh453ead362e5732ep11ecd1jsnb41fc441346h',
  }
});

const options = {
  params: {
    bl_latitude: '11.847676',
    tr_latitude: '12.838442',
    bl_longitude: '109.095887',
    tr_longitude: '109.149359',
  },

};

export const getPlacesData = async (ne: GoogleMapReact.Coords, sw: GoogleMapReact.Coords) => {
  try {
    const {data: {data}} = await Axios.get('restaurants/list-in-boundary', {
      params: {
        bl_latitude: sw?.lat,
        tr_latitude: ne?.lat,
        bl_longitude: sw?.lng,
        tr_longitude: ne?.lng,
      },
    });

    return data;
  } catch (error) {
    console.log(error)
  }
}