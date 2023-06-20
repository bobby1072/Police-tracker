import { Popup, useMapEvents } from "react-leaflet";
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
      const { lat, lng } = e.latlng;
      setLatLng({ lat: lat.toFixed(6), lng: lng.toFixed(6) });
      setCurrentZoom(e.target._zoom);
    },
  });
  if (lat && lng) {
    return (
      <Popup position={[lat, lng]}>
        <p>Lat: {lat}</p>
        <p>Lng: {lng}</p>
      </Popup>
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
