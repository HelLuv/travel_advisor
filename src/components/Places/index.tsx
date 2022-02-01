import * as React from 'react';
import KeyBuilder from "../../api/KeyBuilder";
import {LocationOnOutlined} from "@material-ui/icons";
import {Paper, Typography, useMediaQuery} from "@material-ui/core";
import {Rating} from "@material-ui/lab";
import useStyles from "./style";
import {IPlace} from "../../models/IPlace";

interface PlacesProps {
  places: Array<IPlace>;
}

const Places: React.FC<PlacesProps> = ({places}) => {
  const classes = useStyles();
  const isDesktop = useMediaQuery('(min-width:600px)');

  return (
    <>
      {places?.map((place) => {
        return <div
          className={classes.markerContainer}
          // @ts-ignore
          lat={Number(place?.latitude) ?? ""}
          lng={Number(place?.longitude) ?? ""}
          key={KeyBuilder.build}
        >
          {!isDesktop ? <LocationOnOutlined color={"primary"} fontSize={"large"}/> : (
            <Paper elevation={3} className={classes.paper}>
              <Typography variant={"subtitle2"}>{place?.name}</Typography>
              <img
                src={place?.photo ? place.photo?.images?.large.url : 'https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg'}
                alt={place?.name} className={classes.pointer}/>
              <Rating size={"small"} value={Number(place?.rating)} readOnly/>
            </Paper>
          )}
        </div>
      })}
    </>
  )
};

export default React.memo<PlacesProps>(Places);