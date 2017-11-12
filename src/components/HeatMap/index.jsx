import React from 'react';
import HeatmapLayer from 'react-google-maps/lib/components/visualization/HeatmapLayer';
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} from "react-google-maps";

const HeatMap = withScriptjs(withGoogleMap(props =>
  <GoogleMap
    defaultZoom={5}
    defaultCenter={{ lat: -9.8177974, lng: -74.739109 }}
  >
    <HeatmapLayer
      data={props.list}
    />
  </GoogleMap>
));

export default HeatMap;
