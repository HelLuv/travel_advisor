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
  const [childClicked, setChildClicked] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  React.useEffect(() => {
    navigator.geolocation.getCurrentPosition(({coords: {latitude, longitude}}) => {
      setCoords({lat: latitude, lng: longitude})
    })
  }, [])

  React.useEffect(() => {
    setIsLoading(true)
    getPlacesData(bounds.ne, bounds.sw)
      .then((data) => {
        setPlaces(data);
        setIsLoading(false)
      });

  }, [coords, bounds])

  return (
    <>
      <CssBaseline/>
      <Header/>
      <Grid container spacing={3} style={{width: "100%"}}>
        <Grid item xs={12} md={4}>
          <List
            places={places}
            childClicked={childClicked}
            isLoading={isLoading}
          />
        </Grid>
        <Grid item xs={12} md={8}>
          <Map
            setCoords={setCoords}
            setBounds={setBounds}
            setChildClicked={setChildClicked}
            coords={coords}
            places={places}
          />
        </Grid>
      </Grid>
    </>
  );
}

export default React.memo(App);
