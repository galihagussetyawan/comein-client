export interface IGMediaRes {
  data: Media[];
  paging: Paging;
}

interface Media {
  media_type: string;
  media_product_type: string;
  timestamp: string;
  insights: Insights;
  id: string;
  caption?: string;
}

interface Insights {
  data: Insight[];
}

interface Insight {
  name: string;
  period: string;
  values: Value[];
  title: string;
  description: string;
  id: string;
}

interface Value {
  value: number;
}

interface Paging {
  cursors: Cursors;
}

interface Cursors {
  before: string;
  after: string;
}
