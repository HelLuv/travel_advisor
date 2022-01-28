import * as React from 'react';
import {CircularProgress, Grid, Typography, MenuItem, FormControl, Select, InputLabel} from "@material-ui/core";
import useStyles from './style';
import PlaceDetails from "../PlaceDetails";
import {IPlace} from "../../models/IPlace";
import KeyBuilder from "../../api/KeyBuilder";

interface ListProps {
  places: Array<IPlace>;
}

const List: React.FC<ListProps> = ({places}) => {
  const classes = useStyles();

  const [type, setType] = React.useState<string>("restaurants");
  const [rating, setRating] = React.useState<number>(0);


  return (
    <div className={classes.container}>
      <Typography>Restaurants, Hotels & Attractions around you</Typography>
      <FormControl className={classes.formControl}>
        <InputLabel>Type</InputLabel>
        <Select value={type} onChange={(e) => setType(e.target.value as string)}>
          <MenuItem value="restaurants">Restaurants</MenuItem>
          <MenuItem value="hotels">Hotels</MenuItem>
          <MenuItem value="attractions">Attractions</MenuItem>
        </Select>
      </FormControl>
      <FormControl className={classes.formControl}>
        <InputLabel>Rating</InputLabel>
        <Select value={rating} onChange={(e) => setRating(e.target.value as number)}>
          <MenuItem value={0}>All</MenuItem>
          <MenuItem value={3}>Above 3.0</MenuItem>
          <MenuItem value={4}>Above 4.0</MenuItem>
          <MenuItem value={4.5}>Above 4.5</MenuItem>
        </Select>
      </FormControl>

      <Grid container spacing={3} className={classes.list}>
        {places?.map((place) => {
          return <Grid item key={KeyBuilder.build} xs={12}>
            <PlaceDetails place={place}/>
          </Grid>
        })}
      </Grid>
    </div>
  )
};

export default React.memo(List);
