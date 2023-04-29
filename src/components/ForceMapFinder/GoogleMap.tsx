import React, { useEffect, useState } from "react";
import { Typography } from "@mui/material";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import Geocode from "react-geocode";
import Constants from "../../common/Constants";
import IAllForce from "../../common/ApiTypes/IAllForces";
import forces from "../../common/AllForces.json";
import { useMutation } from "react-query";
interface ILatLng {
  lat: number;
  lng: number;
}
export const ForceMap: React.FC = () => {
  const theForces: IAllForce[] = forces;
  const [position, setPosition] = useState<ILatLng>({ lat: 0, lng: 0 });
  const {
    data: locationData,
    isLoading: locationLoading,
    mutate: locationRequest,
  } = useMutation(async (locations: IAllForce[]) => {
    const promises = locations.map(async (location) => {
      try {
        const response = await Geocode.fromAddress(
          location.id,
          Constants.googleMapsApiKey
        );
        const { lat, lng } = response.results[0].geometry.location;
        return { lat, lng };
      } catch (e) {
        return null;
      }
    });
    const result = await Promise.all(promises);
    return result;
  });
  return locationLoading ? (
    <div
      style={{
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        padding: 2,
      }}
    >
      <Typography fontSize={35} variant="subtitle2">
        Loading...
      </Typography>
    </div>
  ) : (
    <div>
      {locationData && (
        <LoadScript googleMapsApiKey={Constants.googleMapsApiKey}>
          <GoogleMap center={position} zoom={10}>
            {locationData
              .filter((x) => Boolean(x))
              .map((marker, index) => (
                <Marker
                  key={index}
                  position={{ lat: marker!.lat, lng: marker!.lng }}
                  onClick={() => console.log(`Marker ${index + 1} clicked`)}
                />
              ))}
          </GoogleMap>
        </LoadScript>
      )}
    </div>
  );
};
