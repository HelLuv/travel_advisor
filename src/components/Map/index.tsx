import * as React from 'react';
import GoogleMapReact from 'google-map-react';
import {Paper, Typography, useMediaQuery} from "@material-ui/core";
import {LocationOnOutlined} from "@material-ui/icons";
import {Rating} from "@material-ui/lab";
import useStyles from './style';

interface MapProps {

}

const Map: React.FC<MapProps> = ({}) => {
  const classes = useStyles();
  const isMobile = useMediaQuery('(min-width:600px)')
  return (
    <h1>map</h1>
  )
};

export default React.memo(Map);