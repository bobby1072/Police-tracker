import { Marker, Popup, useMapEvents } from "react-leaflet";
import { GenerateMap } from "./GenerateMap";

interface ILatLngMapProps {
  lat: number;
  lng: number;
  setLat: (lat: number) => void;
  setLng: (lng: number) => void;
}
interface ILocationFinderProps extends ILatLngMapProps {}
const LocationFinder: React.FC<ILocationFinderProps> = ({
  lat,
  lng,
  setLat,
  setLng,
}) => {
  useMapEvents({
    click(e: any) {
      setLat(e.latlng.lat);
      setLng(e.latlng.lng);
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
  setLat,
  setLng,
}) => {
  return (
    <GenerateMap>
      <LocationFinder lat={lat} lng={lng} setLat={setLat} setLng={setLng} />
    </GenerateMap>
  );
};
