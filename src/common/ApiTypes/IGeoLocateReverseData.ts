export interface IGeoLocateReverseData {
  place_id: number;
  licence: string;
  powered_by: string;
  osm_type: string;
  osm_id: number;
  lat: string;
  lon: string;
  display_name: string;
  address?: {
    road?: string;
    suburb?: string;
    village?: string;
    city?: string;
    county?: string;
    state_district?: string;
    state?: string;
    postcode?: string;
    country: string;
    country_code: string;
  };
  boundingbox: string[];
}
