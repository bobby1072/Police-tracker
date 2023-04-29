export default interface ICrimeReport {
  category: string;
  location_type: string | null;
  location: string | null;
  context: string;
  outcome_status: {
    category: string;
    date: string;
  } | null;
  persistent_id: string;
  id: number;
  location_subtype: string;
  month: string;
}
