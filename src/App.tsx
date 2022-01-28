import * as React from "react";
import Header from "./components/Header";
import {CssBaseline} from "@material-ui/core";
import {Grid} from "@material-ui/core";
import List from "./components/List";
import Map from "./components/Map";
import {getPlacesData} from "./api";
import {ICoords} from "./models/ICoords";
import {IBounds} from "./models/IBounds";

function App() {

  const [places, setPlaces] = React.useState([]);
  const [coords, setCoords] = React.useState<ICoords>({} as ICoords);
  const [bounds, setBounds] = React.useState<IBounds>({} as IBounds);

  React.useEffect(() => {
    navigator.geolocation.getCurrentPosition(({coords: {latitude, longitude}}) => {
      setCoords({lat: latitude, lng: longitude})
    })
  }, [])

  React.useEffect(() => {
    getPlacesData(bounds.ne, bounds.sw)
      .then((data) => {
        setPlaces(data);
      });

  }, [coords, bounds])

  return (
    <>
      <CssBaseline/>
      <Header/>
      <Grid container spacing={3} style={{width: "100%"}}>
        <Grid item xs={12} md={4}>
          <List places={places}/>
        </Grid>
        <Grid item xs={12} md={8}>
          <Map
            setCoords={setCoords}
            setBounds={setBounds}
            coords={coords}
          />
        </Grid>
      </Grid>
    </>
  );
}

export default React.memo(App);
