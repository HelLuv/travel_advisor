import * as React from "react";
import Header from "./components/Header";
import {CssBaseline} from "@material-ui/core";
import {Grid} from "@material-ui/core";
import List from "./components/List";
import Map from "./components/Map";
import {getPlacesData} from "./api";
import {ICoords} from "./models/ICoords";
import {IBounds} from "./models/IBounds";
import {IPlace} from "./models/IPlace";

function App() {

  const [places, setPlaces] = React.useState<Array<IPlace>>([]);
  const [filteredPlaces, setFilteredPlaces] = React.useState<Array<IPlace>>([]);
  const [coords, setCoords] = React.useState<ICoords>({} as ICoords);
  const [bounds, setBounds] = React.useState<IBounds>({} as IBounds);
  const [childClicked, setChildClicked] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [type, setType] = React.useState<string>("restaurants");
  const [rating, setRating] = React.useState<number>(0);


  React.useEffect(() => {
    navigator.geolocation.getCurrentPosition(({coords: {latitude, longitude}}) => {
      setCoords({lat: latitude, lng: longitude})
    })
  }, [])

  React.useEffect(() => {
    const filteredPlaces = places?.filter((place) => Number(place.rating) > rating);

    setFilteredPlaces(filteredPlaces)
  }, [rating])

  React.useEffect(() => {
    setIsLoading(true)
    getPlacesData(type, bounds.ne, bounds.sw)
      .then((data) => {
        setPlaces(data);
        setFilteredPlaces([]);
        setIsLoading(false)
      });

  }, [type, bounds])

  return (
    <>
      <CssBaseline/>
      <Header/>
      <Grid container spacing={3} style={{width: "100%"}}>
        <Grid item xs={12} md={4}>
          <List
            places={filteredPlaces?.length ? filteredPlaces : places}
            childClicked={childClicked}
            isLoading={isLoading}
            setType={setType}
            type={type}
            setRating={setRating}
            rating={rating}
          />
        </Grid>
        <Grid item xs={12} md={8}>
          <Map
            setCoords={setCoords}
            setBounds={setBounds}
            setChildClicked={setChildClicked}
            coords={coords}
            places={filteredPlaces?.length ? filteredPlaces : places}
          />
        </Grid>
      </Grid>
    </>
  );
}

export default React.memo(App);
