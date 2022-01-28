import axios from "axios";

const Axios = axios.create({
  baseURL: 'https://travel-advisor.p.rapidapi.com/',
  headers: {
    'x-rapidapi-host': 'travel-advisor.p.rapidapi.com',
    'x-rapidapi-key': '876800fa49msh20aa13767644fd1p15b096jsn00c3efe3747b'
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

export const getPlacesData = async () => {
  try {
    const {data: {data}} = await Axios.get('restaurants/list-in-boundary', options);

    return data;
  } catch (error) {
    console.log(error)
  }
}