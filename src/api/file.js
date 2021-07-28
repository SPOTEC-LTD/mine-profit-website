import { createAPI, httpMethod } from '@/shared/utils/request';

export const uploadFileUrl = `${process.env.BASE_API}/oss/file/upload`;

export const uploadFile = createAPI(httpMethod.POST, '/oss/file/upload');

export const uploadPackageFile = `${process.env.BASE_API}/oss/package/upload`;
