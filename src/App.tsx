import * as React from "react";
import Header from "./components/Header";
import {CssBaseline} from "@material-ui/core";
import { Grid } from "@material-ui/core";
import List from "./components/List";
import Map from "./components/Map";

function App() {
  return (
    <>
      <CssBaseline/>
      <Header/>
      <Grid container spacing={3} style={{width: "100%"}} >
<Grid item xs={12} md={4} >
<List/>
</Grid>
        <Grid item xs={12} md={8} >
<Map/>
</Grid>
      </Grid>
    </>
  );
}

export default React.memo(App);
