/* eslint-disable no-lone-blocks */
import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';
import { message } from 'antd'
//import { storageService } from '../services/StorageService';
//import { accountService } from '../services/AccountService';


axios.defaults.baseURL = process.env.REACT_APP_SERVER_HOST
export const SetupInterceptors = (clearStore:Function|null) => {
    axios.interceptors.request.use(
        async (config: InternalAxiosRequestConfig) => {
            if (config.headers) {
               // config.headers['Authorization'] = `Bearer ${storageService.getAccessToken()}`;
              }
            return config
          },
        async (error) => {
    
          message.error(`${error.status} ${error.message}`)
          return Promise.reject(error);
    });

  axios.interceptors.response.use(
    async response => response,
    async (error:AxiosError) => {
      const status = error.response?.status || 500;
      switch (status){
        
        case 401: {
           // storageService.removeTokens();
           // clearStore();
            (window.location as Location).href = '/login';
          }
        break;
        

        default: {
        //  const location = window.location.pathname.slice(1);
        //  window.location = `/error?status=${status}&title=${status}&subTitle=${error.message}&location=${location === '' ? 'main' : 'notmain'}`;
          message.error(error.message)
        //   if (error?.response?.data) {
        //     if (error.response.data.message) {
        //       message.error(error.response.data.message);
        //     } else if (Array.isArray(error.response.data)) {
        //       error.response.data.forEach((element: { ErrorMessage: string }) => {
        //         message.error(element.ErrorMessage);
        //       });
        //     }
        //   }

          return Promise.reject(error);
        }
      }
    }
  );
}