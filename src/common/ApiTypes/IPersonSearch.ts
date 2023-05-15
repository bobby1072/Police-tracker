interface Location {
  latitude: string;
  street: {
    id: number;
    name: string;
  };
  longitude: string;
}

interface OutcomeObject {
  id: string;
  name: string;
}

export default interface IPersonSearch {
  age_range: string | null;
  outcome: string;
  involved_person: boolean;
  self_defined_ethnicity: string;
  gender: string;
  legislation: string;
  outcome_linked_to_object_of_search: boolean;
  datetime: string;
  removal_of_more_than_outer_clothing: boolean;
  outcome_object: OutcomeObject;
  location: Location | null;
  operation: null;
  officer_defined_ethnicity: string;
  type: string;
  operation_name: null;
  object_of_search: string;
}
