import { createAPI, httpMethod } from '@/shared/utils/request';

export const getStationMailList = createAPI(httpMethod.GET, '/operation/msg/internal_msg');
export const mailAllRead = createAPI(httpMethod.POST, '/operation/msg/internal_msg/read');
export const mailReadDetail = createAPI(httpMethod.POST, '/operation/msg/internal_msg/read/:id');
export const getWeeklyReportDetail = createAPI(httpMethod.GET, '/operation/weekly/:id/reportInfo');
