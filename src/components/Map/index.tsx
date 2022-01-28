import * as React from 'react';
import GoogleMapReact from 'google-map-react';
import {Paper, Typography, useMediaQuery} from "@material-ui/core";
import {LocationOnOutlined} from "@material-ui/icons";
import {Rating} from "@material-ui/lab";
import useStyles from './style';

interface MapProps {

}

const Map: React.FC<MapProps> = ({}) => {
  const classes = useStyles();
  const isMobile = useMediaQuery('(min-width:600px)');

  const coords = {lat: 0, lng: 0}
  return (
    <div className={classes.mapContainer}>
      <GoogleMapReact
        bootstrapURLKeys={{key: 'AIzaSyBbthxgIYiM9COjJD89xIijgNV1rOW-C3o'}}
        defaultCenter={coords}
        center={coords}
        defaultZoom={14}
        margin={[50, 50, 50, 50]}
        options={{}}
        onChange={() => console.log('onChange')}
        onChildClick={() => console.log('onChange')}
      >

      </GoogleMapReact>
    </div>
  )
};

export default React.memo(Map);