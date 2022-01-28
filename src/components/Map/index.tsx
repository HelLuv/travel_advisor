import * as React from 'react';
import GoogleMapReact from 'google-map-react';
import {Paper, Typography, useMediaQuery} from "@material-ui/core";
import {LocationOnOutlined} from "@material-ui/icons";
import {Rating} from "@material-ui/lab";
import useStyles from './style';
import {ICoords} from "../../models/ICoords";
import {IBounds} from "../../models/IBounds";

interface MapProps {
  setCoords: (coords: ICoords) => void;
  setBounds: (bounds: IBounds) => void;
  coords: ICoords;
}

const Map: React.FC<MapProps> = ({setCoords, setBounds, coords}) => {
  const classes = useStyles();
  const isMobile = useMediaQuery('(min-width:600px)');

  const mapChangeHandler = (e: GoogleMapReact.ChangeEventValue) => {
    setCoords({lat: e.center.lat, lng: e.center.lng});
    setBounds({ne: e.marginBounds.ne, sw: e.marginBounds.sw})
  }

  return (
    <div className={classes.mapContainer}>
      <GoogleMapReact
        bootstrapURLKeys={{key: 'AIzaSyBbthxgIYiM9COjJD89xIijgNV1rOW-C3o'}}
        defaultCenter={coords}
        center={coords}
        defaultZoom={14}
        margin={[50, 50, 50, 50]}
        options={{}}
        onChange={(e) => mapChangeHandler(e)}
        onChildClick={() => console.log('')}
      >

      </GoogleMapReact>
    </div>
  )
};

export default React.memo(Map);