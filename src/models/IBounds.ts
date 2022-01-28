import GoogleMapReact from "google-map-react";

export interface IBounds {
  ne: GoogleMapReact.Coords;
  sw: GoogleMapReact.Coords
}