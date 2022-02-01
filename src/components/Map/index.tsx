import * as React from 'react';
import GoogleMapReact from 'google-map-react';
import useStyles from './style';
import {ICoords} from "../../models/ICoords";
import {IBounds} from "../../models/IBounds";
import {IPlace} from "../../models/IPlace";
import mapStyles from "./mapStyles";
import Weather from "../Weather";
import Places from "../Places";

interface MapProps {
  setCoords: (coords: ICoords) => void;
  setBounds: (bounds: IBounds) => void;
  coords: ICoords;
  places: Array<IPlace>;
  setChildClicked: (child: any) => void;
  weatherData: { list: Array<any> };
}

const Map: React.FC<MapProps> = ({setCoords, setBounds, coords, places, setChildClicked, weatherData}) => {
  const classes = useStyles();

  const mapChangeHandler = (e: GoogleMapReact.ChangeEventValue) => {
    setCoords({lat: e.center.lat, lng: e.center.lng});
    setBounds({ne: e.marginBounds.ne, sw: e.marginBounds.sw})
  }
  return (
    <div className={classes.mapContainer}>
      <GoogleMapReact
        bootstrapURLKeys={{key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY ?? ''}}
        defaultCenter={coords}
        center={coords}
        defaultZoom={14}
        margin={[50, 50, 50, 50]}
        options={{disableDefaultUI: true, zoomControl: true, styles: mapStyles}}
        onChange={(e) => mapChangeHandler(e)}
        onChildClick={(child) => setChildClicked(child)}
      >
        <Places places={places}/>
        <Weather weatherData={weatherData}/>
      </GoogleMapReact>
    </div>
  )
};

export default React.memo(Map);