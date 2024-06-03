import axios, { AxiosRequestConfig, AxiosError } from 'axios';
import { IApiQueries, IApiGet, IApiResult, IApiPost } from './types'

const baseUrl = process.env.NEXT_PUBLIC_MONGOOSE_URL;
const defaultConfig: AxiosRequestConfig = {
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
    'Accept-Version': 'v1',
  }
}
const authConfig = (token: string): AxiosRequestConfig => {
  return {
    timeout: 5000,
    headers: {
      'Content-Type': 'application/json',
      'Accept-Version': 'v1',
      'Authorization': `Bearer ${token}`
    }
  }
}

export class ApiError extends Error {
  statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
  }
}

const api = {
  get: async ({ baseUrl: newBaeUrl, url, queries, token, tags }: IApiGet) => {
    try {
      let reqUrl = `${newBaeUrl || baseUrl}${url}`;
      if (queries) {
        reqUrl += `?${Object.keys(queries).map(k => `${k}=${queries[k]}`).join("&")}`
      }
      const config = {
        ...token ? authConfig(token) : defaultConfig,
        next: tags ? { tags: tags } : undefined,
      };
      const res = await axios.get(reqUrl, config);
      return res.data;
    } catch (error) {
      console.error('Error retrieving data:', error);
      const statusCode = (error as AxiosError)?.response?.status || 500;
      throw new ApiError('Error retrieving data:', statusCode);
    }
  },
  post: async ({ baseUrl: newBaeUrl, url, queries, token, body }: IApiPost) => {
    try {
      let reqUrl = `${newBaeUrl || baseUrl}${url}`;
      if (queries) {
        reqUrl += `?${Object.keys(queries).map(k => `${k}=${queries[k]}`).join("&")}`
      }

      let config = token ? authConfig(token) : defaultConfig;
      if (body instanceof FormData) {
        config = {
          ...config,
          headers: {
            ...config.headers,
            'Content-Type': 'multipart/form-data',
          },
        };
      }
      const res = await axios.post(reqUrl, body, config);
      return res.data;
    } catch (error) {
      console.error('Error retrieving data:', error);
      const statusCode = (error as AxiosError)?.response?.status || 500;
      throw new ApiError('Error retrieving data:', statusCode);
    }
  },
  delete: async ({ baseUrl: newBaeUrl, url, token }: IApiPost) => {
    try {
      let reqUrl = `${newBaeUrl || baseUrl}${url}`;
      const config = token ? authConfig(token) : defaultConfig;
      const res = await axios.delete(reqUrl, config);
      return res.data;
    } catch (error) {
      console.error('Error retrieving data:', error);
      const statusCode = (error as AxiosError)?.response?.status || 500;
      throw new ApiError('Error retrieving data:', statusCode);
    }
  },
}


export default api