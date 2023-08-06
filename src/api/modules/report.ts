import { defHttp } from '@/api';
import type {
  ReportBaseInfo,
  ReportTrend,
  StartModeProportion,
  StationSaleRankForMonth,
} from './types/report.type';

// 获取 收入基本信息(今、昨、总)
export function getBaseInfo() {
  return defHttp.get<ReportBaseInfo[]>({ url: 'bi/chargeOverview/baseInfo' });
}

// 获取 充电收入趋势（充电总览、充电站统计明细、充电桩统计明细）
export function getTrend(params?: any) {
  return defHttp.get<ReportTrend>({ url: 'bi/chargeOverview/trend', params });
}

// 获取 月度/年度收入统计
export function getMonthOrYear(params: any) {
  return defHttp.get<ReportTrend>({ url: 'bi/chargeOverview/incomeCensusInfo', params });
}

// 获取 充电启动充电方式占比
export function getStartModeProportion(params: any) {
  return defHttp.get<StartModeProportion[]>({
    url: 'bi/chargeOverview/startModeProportion',
    params,
  });
}

// 获取 本月充电站销售额前十排名
export function getStationSaleRankForMonth(params: any) {
  return defHttp.get<StationSaleRankForMonth>({
    url: 'bi/chargeOverview/stationSaleRankForMonth',
    params,
  });
}

// 获取 充电站销售额前十排名
export function getStationSaleRank(params: any) {
  return defHttp.get({ url: 'bi/chargeOverview/stationSaleRank', params });
}

// 获取 发票统计基本信息
export function getInvoiceStatistics() {
  return defHttp.get({ url: 'bi/invoiceStatistics/baseInfo' });
}

// 获取 开票日统计趋势
export function getInvoiceStatisticsTrend(params: any) {
  return defHttp.get({ url: 'bi/invoiceStatistics/trend', params });
}

// 获取 开票月/年度统计趋势
export function getInvoiceCensusInfo(params: any) {
  return defHttp.get({ url: 'bi/invoiceStatistics/invoiceCensusInfo', params });
}
