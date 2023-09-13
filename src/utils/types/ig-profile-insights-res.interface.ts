export interface IGProfileRes {
  id: string;
  username: string;
  followers_count: number;
  follows_count: number;
  media_count: number;
  insights: Insights;
}

interface Insights {
  data: Insight[];
  paging: Paging;
}

export interface Insight {
  name: string;
  period: string;
  values: Value[];
  title: string;
  total_value: number;
  since: string;
  until: string;
}

interface Value {
  value: number;
  end_time: string;
}

interface Paging {
  previous: string;
  next: string;
}
