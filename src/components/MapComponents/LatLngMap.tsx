import { Marker, Popup, useMapEvents } from "react-leaflet";
import { GenerateMap } from "./GenerateMap";
import { IlatLng } from "../FindCrimeMap/FindCrimeMapContainer";
import { useState } from "react";

interface ILatLngMapProps {
  lat?: number;
  lng?: number;
  setLatLng: (latLng: IlatLng) => void;
}
interface ILocationFinderProps extends ILatLngMapProps {
  setCurrentZoom: (zoom: number) => void;
}
const LocationFinder: React.FC<ILocationFinderProps> = ({
  lat,
  lng,
  setLatLng,
  setCurrentZoom,
}) => {
  useMapEvents({
    click(e: any) {
      setLatLng({ lat: e.latLng.lat, lng: e.latlng.lng });
      setCurrentZoom(e.target._zoom);
    },
  });
  if (lat && lng) {
    return (
      <Marker position={[lat, lng]}>
        <Popup>
          <p>Lat: {lat}</p>
          <br />
          <p>Lng: {lng}</p>
        </Popup>
      </Marker>
    );
  } else {
    return null;
  }
};
export const LatLngMap: React.FC<ILatLngMapProps> = ({
  lat,
  lng,
  setLatLng,
}) => {
  const [currentMapZoom, setCurrentMapZoom] = useState<number>();
  return (
    <GenerateMap
      center={lat && lng ? [lat, lng] : undefined}
      zoom={currentMapZoom}
    >
      <LocationFinder
        lat={lat}
        lng={lng}
        setLatLng={setLatLng}
        setCurrentZoom={(zoom: number) => {
          setCurrentMapZoom(zoom);
        }}
      />
    </GenerateMap>
  );
};
