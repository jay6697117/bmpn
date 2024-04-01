import axios, { InternalAxiosRequestConfig, AxiosInstance, AxiosResponse } from 'axios';
import {VUE_APP_API_BASE_URL_PROD,VUE_APP_API_BASE_URL_TEST,VUE_APP_API_BASE_URL} from '@/config/env'
// 根据环境设置不同的 baseURL
// console.log(process.env.NODE_ENV)
// console.log(process.env)
// const baseURL = process.env.NODE_ENV === 'production' ? process.env.VITE_API_BASE_URL_PROD : (process.env.NODE_ENV === 'test' ? process.env.VITE_API_BASE_URL_TEST : process.env.VITE_API_BASE_URL);
// console.log(baseURL)

const baseURL = process.env.NODE_ENV === 'production' ? VUE_APP_API_BASE_URL_PROD : (process.env.NODE_ENV === 'test' ? VUE_APP_API_BASE_URL_TEST : VUE_APP_API_BASE_URL);

// console.log(baseURL)

// 创建一个axios实例
const axiosInstance: AxiosInstance = axios.create({
  // baseURL: baseURL,
  baseURL:'http://10.20.212.82:9509',
  timeout: 10000,
});
 
// 添加请求拦截器
axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
  // 在发送请求之前做些什么
  return config;
  },
  (error: any) => {
  // 处理请求错误
  return Promise.reject(error);
  },
);
 
// 添加响应拦截器
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
  // 对响应数据做点什么
  return response;
  },
  (error: any) => {
  // 处理响应错误
  return Promise.reject(error);
  },
);
 
export default axiosInstance;