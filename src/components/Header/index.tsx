import * as React from 'react';
import {Autocomplete} from "@react-google-maps/api";
import {AppBar, Toolbar, Typography, InputBase, Box} from "@material-ui/core";
import {Search} from '@material-ui/icons';
import useStyles from './style';
import {ICoords} from "../../models/ICoords";

interface HeaderProps {
  setCoords: (coords: ICoords) => void;
}

const Header: React.FC<HeaderProps> = ({setCoords}) => {
  const classes = useStyles();
  const [autocomplete, setAutocomplete] = React.useState<google.maps.places.Autocomplete | null>(null);

  const onLoad = (autoC: google.maps.places.Autocomplete) => {
    setAutocomplete(autoC)
  }

  const onPlaceChanged = () => {
    const lat = autocomplete?.getPlace()?.geometry?.location?.lat() ?? 0;
    const lng = autocomplete?.getPlace()?.geometry?.location?.lng() ?? 0;

    setCoords({lat, lng});
  }

  return (
    <AppBar position='static' className={classes.appbar}>
      <Toolbar className={classes.toolbar}>
        <Typography variant="h5" className={classes.title}>
          Travel Advisor
        </Typography>
        <Box display={'flex'}>
          <Typography variant="h6" className={classes.title}>
            Explore new places
          </Typography>

          <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <Search/>
              </div>
              <InputBase placeholder={"Search..."} classes={{root: classes.inputRoot, input: classes.inputInput}}/>
            </div>
          </Autocomplete>
        </Box>
      </Toolbar>
    </AppBar>
  )
};

export default React.memo(Header);