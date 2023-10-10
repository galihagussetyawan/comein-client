export interface IGAudienceDemographicsRes {
  data: Audience[];
}

interface Audience {
  name: string;
  period: string;
  title: string;
  description: string;
  total_value: TotalValue;
  id: string;
}

interface TotalValue {
  breakdowns: Breakdown[];
}

interface Breakdown {
  dimension_keys: string[];
  results: Result[];
}

interface Result {
  dimension_values: string[];
  value: number;
}
