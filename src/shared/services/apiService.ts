import axiosClient from '@lib/axiosClient';
import type { AxiosRequestConfig, AxiosResponse } from 'axios';

import { HTTP_METHOD, type HttpMethod } from '@shared/constants/httpMethod';
import type { ApiResponse } from '@shared/types/api';
import { throwApiError } from '@shared/services/apiError';

const extractData = <T>(
  response: AxiosResponse<ApiResponse<T>>,
): T => response.data.data;

const extractFullResponse = <T>(
  response: AxiosResponse<ApiResponse<T>>,
): ApiResponse<T> => response.data;

interface BaseRequestOptions<D> {
  url: string;
  method: HttpMethod;
  data?: D;
  config?: AxiosRequestConfig;
}

const requestData = async <T, D = unknown>({
  url,
  method,
  data,
  config,
}: BaseRequestOptions<D>): Promise<T> => {
  try {
    const response = await axiosClient.request<ApiResponse<T>>({
      url,
      method,
      data,
      ...config,
    });

    return extractData(response);
  } catch (error) {
    throwApiError(error);
    throw error;
  }
};

const requestFull = async <T, D = unknown>({
  url,
  method,
  data,
  config,
}: BaseRequestOptions<D>): Promise<ApiResponse<T>> => {
  try {
    const response = await axiosClient.request<ApiResponse<T>>({
      url,
      method,
      data,
      ...config,
    });

    return extractFullResponse(response);
  } catch (error) {
    throwApiError(error);
    throw error;
  }
};

export const GET = <T>(
  url: string,
  config?: AxiosRequestConfig,
): Promise<T> =>
    requestData<T>({
      url,
      method: HTTP_METHOD.GET,
      config,
    });

export const POST = <T, D = unknown>(
  url: string,
  data?: D,
  config?: AxiosRequestConfig,
): Promise<T> =>
    requestData<T, D>({
      url,
      method: HTTP_METHOD.POST,
      data,
      config,
    });

export const POST_FULL = <T, D = unknown>(
  url: string,
  data?: D,
  config?: AxiosRequestConfig,
): Promise<ApiResponse<T>> =>
    requestFull<T, D>({
      url,
      method: HTTP_METHOD.POST,
      data,
      config,
    });

export const PUT = <T, D = unknown>(
  url: string,
  data?: D,
  config?: AxiosRequestConfig,
): Promise<T> =>
    requestData<T, D>({
      url,
      method: HTTP_METHOD.PUT,
      data,
      config,
    });

export const PATCH = <T, D = unknown>(
  url: string,
  data?: D,
  config?: AxiosRequestConfig,
): Promise<T> =>
    requestData<T, D>({
      url,
      method: HTTP_METHOD.PATCH,
      data,
      config,
    });

export const DELETE = <T>(
  url: string,
  config?: AxiosRequestConfig,
): Promise<T> =>
    requestData<T>({
      url,
      method: HTTP_METHOD.DELETE,
      config,
    });

export const DELETE_FULL = <T>(
  url: string,
  config?: AxiosRequestConfig,
): Promise<ApiResponse<T>> =>
    requestFull<T>({
      url,
      method: HTTP_METHOD.DELETE,
      config,
    });
