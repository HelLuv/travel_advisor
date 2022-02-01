import * as React from 'react';
import {CircularProgress, Grid, Typography} from "@material-ui/core";
import useStyles from './style';
import PlaceDetails from "../PlaceDetails";
import {IPlace} from "../../models/IPlace";
import KeyBuilder from "../../api/KeyBuilder";
import Filters from "../Filters";

interface ListProps {
  places: Array<IPlace>;
  childClicked: any;
  isLoading: boolean;
  setType: (type: string) => void;
  type: string;
  rating: number;
  setRating: (rating: number) => void;
}

const List: React.FC<ListProps> = ({places, childClicked, isLoading, setRating, setType, rating, type}) => {
  const classes = useStyles();


  const [elmRef, setElmRef] = React.useState([]);

  React.useEffect(() => {
    // @ts-ignore
    const refs = Array(places?.length).fill().map((_, i) => elmRef[i] || React.createRef());

    setElmRef(refs);
  }, [places])

  return (
    <div className={classes.container}>
      <Typography variant="h4">Restaurants, Hotels & Attractions around you</Typography>
      {isLoading ? (
        <div className={classes.loading}>
          <CircularProgress size={"5rem"}/>
        </div>
      ) : (
        <>
          <Filters type={type} setRating={setRating} rating={rating} setType={setType}/>
          <Grid container spacing={3} className={classes.list}>
            {places?.map((place, index) => {
              return <Grid item key={KeyBuilder.build} xs={12}>
                <PlaceDetails
                  place={place}
                  selected={Number(childClicked) === index}
                  refProp={elmRef[index]}
                />
              </Grid>
            })}
          </Grid>
        </>
      )}
    </div>
  )
};

export default React.memo(List);
