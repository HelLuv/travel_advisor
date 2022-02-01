import * as React from 'react';
import {IPlace} from "../../models/IPlace";
import useStyles from './style';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Chip,
  Typography,
} from "@material-ui/core";
import KeyBuilder from "../../api/KeyBuilder";
import {LocationOn, Phone} from "@material-ui/icons";
import {Rating} from "@material-ui/lab";

interface PlaceDetailsProps {
  place: IPlace;
  selected: boolean;
  refProp: any;
}

const PlaceDetails: React.FC<PlaceDetailsProps> = ({place, selected, refProp}) => {
  const classes = useStyles();


  React.useEffect(() => {
    if (selected) {
      refProp?.current?.scrollIntoView({behavior: "smooth", block: "start"});
    }
  }, [refProp, selected])

  return (
    <Card elevation={3} ref={refProp}>
      <CardMedia
        style={{height: 350}}
        image={place?.photo ? place.photo.images.large.url : 'https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg'}
        title={place?.name}
      />
      <CardContent>
        <Typography gutterBottom variant="h5">{place?.name}</Typography>
        <Box display="flex" justifyContent="space-between">
          <Typography variant="subtitle1">Price</Typography>
          <Typography gutterBottom variant="subtitle1">{place?.price_level}</Typography>
        </Box>
        <Box display="flex" justifyContent="space-between">
          <Rating size={"small"} value={Number(place?.rating)} readOnly/>
          <Typography gutterBottom variant="subtitle1">out of {place.num_reviews} reviews</Typography>
        </Box>
        <Box display="flex" justifyContent="space-between">
          <Typography variant="subtitle1">Ranking</Typography>
          <Typography gutterBottom variant="subtitle1">{place?.ranking}</Typography>
        </Box>
        {place?.awards?.map((award) => (
          <Box my={1} key={KeyBuilder.build} display="flex" justifyContent="space-between" alignItems="center">
            <img src={award?.images?.small} alt={award?.display_name}/>
            <Typography variant="subtitle2" color="textSecondary">{award?.display_name}</Typography>
          </Box>
        ))}
        {place?.cuisine?.map(({name}) => (
          <Chip label={name} size={"small"} key={KeyBuilder.build} className={classes.chip}/>
        ))}
        {place?.address && (
          <Typography gutterBottom variant={"subtitle2"} color={"textSecondary"} className={classes.subtitle}>
            <LocationOn/> {place.address}
          </Typography>
        )}
        {place?.phone && (
          <Typography gutterBottom variant={"subtitle2"} color={"textSecondary"} className={classes.subtitle}>
            <Phone/> {place.phone}
          </Typography>
        )}
        <CardActions>
          <Button size={"small"} color={"primary"} onClick={() => window.open(place?.web_url, '_blank')}>
            Trip Advisor
          </Button>
          <Button size={"small"} color={"primary"} onClick={() => window.open(place?.website, '_blank')}>
            Visit Website
          </Button>
        </CardActions>
      </CardContent>
    </Card>
  )
};

export default React.memo(PlaceDetails);