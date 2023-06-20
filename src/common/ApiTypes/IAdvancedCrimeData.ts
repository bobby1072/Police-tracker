export default interface IAdvancedCrimeData {
  crime: {
    category: string | undefined | null;
    persistent_id: string | undefined | null;
    location_subtype: string | undefined | null;
    location_type: string | undefined | null;
    location: {
      latitude: string | undefined | null;
      street: {
        id: number | undefined | null;
        name: string | undefined | null;
      };
      longitude: string | undefined | null;
    };
    context: string | undefined | null;
    month: string | undefined | null;
    id: number | undefined | null;
  };
  outcomes: {
    category: {
      code: string | undefined | null;
      name: string | undefined | null;
    };
    date: string | undefined | null;
    person_id: string | undefined | null;
  }[];
}
