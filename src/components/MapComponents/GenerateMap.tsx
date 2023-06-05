import { LayersControl, MapContainer, TileLayer } from "react-leaflet";
const MapLayers: React.FC = () => {
  const { BaseLayer } = LayersControl;
  return (
    <LayersControl>
      <BaseLayer checked name="OpenStreetMap">
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      </BaseLayer>
      <BaseLayer name="Smooth Street Map">
        <TileLayer url="https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png" />
      </BaseLayer>
      <BaseLayer name="World Imagery">
        <TileLayer url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}" />
      </BaseLayer>
    </LayersControl>
  );
};
interface IGenerateMapProps {
  children: JSX.Element | JSX.Element[];
  zoom?: number;
}
export const GenerateMap: React.FC<IGenerateMapProps> = ({ children }) => {
  return (
    <MapContainer>
      <MapLayers />
      {children}
    </MapContainer>
  );
};
