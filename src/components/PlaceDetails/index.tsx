import * as React from 'react';

interface PlaceDetailsProps {
  place: { name: string }
}

const PlaceDetails: React.FC<PlaceDetailsProps> = ({place}) => {

  return (
    <h1>{place.name}</h1>
  )
};

export default React.memo(PlaceDetails);