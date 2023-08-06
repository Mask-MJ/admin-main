export interface ReportBaseInfo {
  name: string;
  income: number;
  orderCount: number;
  totalBattery: number;
}

export interface ReportTrendItem {
  name: string;
  data: number[];
  type?: string;
}

export interface ReportTrend {
  data: ReportTrendItem[];
  time: string[];
}

export interface StartModeProportion {
  name: string;
  value: number;
}

export interface StationSaleRankForMonthItem {
  name: string;
  data: number[];
  type?: string;
}

export interface StationSaleRankForMonth {
  data: StationSaleRankForMonthItem[];
  title: string[];
}
