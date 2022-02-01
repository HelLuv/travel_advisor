import * as React from 'react';
import GoogleMapReact from 'google-map-react';
import {Paper, Typography, useMediaQuery} from "@material-ui/core";
import {LocationOnOutlined} from "@material-ui/icons";
import {Rating} from "@material-ui/lab";
import useStyles from './style';
import {ICoords} from "../../models/ICoords";
import {IBounds} from "../../models/IBounds";
import {IPlace} from "../../models/IPlace";
import KeyBuilder from "../../api/KeyBuilder";
import mapStyles from "./mapStyles";

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
  const isDesktop = useMediaQuery('(min-width:600px)');

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
        {places?.map((place) => {
          return <div
            className={classes.markerContainer}
            // @ts-ignore
            lat={Number(place.latitude) ?? ""}
            lng={Number(place.longitude) ?? ""}
            key={KeyBuilder.build}
          >
            {!isDesktop ? <LocationOnOutlined color={"primary"} fontSize={"large"}/> : (
              <Paper elevation={3} className={classes.paper}>
                <Typography variant={"subtitle2"}>{place?.name}</Typography>
                <img
                  src={place?.photo ? place.photo.images.large.url : 'https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg'}
                  alt={place?.name} className={classes.pointer}/>
                <Rating size={"small"} value={Number(place?.rating)} readOnly/>
              </Paper>
            )}
          </div>
        })}

        {weatherData?.list?.map((item) => (
            // @ts-ignore
            <div key={KeyBuilder.build} lat={item?.coord?.lat} lng={item?.coord?.lon}>
              <img height={80} src={`https://openweathermap.org/img/w/${item.weather[0].icon}.png`} alt={item?.name}/>
            </div>
          )
        )}
      </GoogleMapReact>
    </div>
  )
};

export default React.memo(Map);