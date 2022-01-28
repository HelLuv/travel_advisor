import * as React from "react";
import Header from "./components/Header";
import {CssBaseline} from "@material-ui/core";
import {Grid} from "@material-ui/core";
import List from "./components/List";
import Map from "./components/Map";
import {getPlacesData} from "./api";
import {ICoords} from "./models/ICoords";

function App() {

  const [places, setPlaces] = React.useState([]);
  const [coords, setCoords] = React.useState<ICoords>({} as ICoords);
  const [bounds, setBounds] = React.useState(null);

  React.useEffect(() => {
    getPlacesData()
      .then((data) => {
        setPlaces(data)
        console.log(data)
      });

  }, [])

  return (
    <>
      <CssBaseline/>
      <Header/>
      <Grid container spacing={3} style={{width: "100%"}}>
        <Grid item xs={12} md={4}>
          <List/>
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
