import { AxiosRequestConfig } from "axios";
export declare const get: <T>(url: string, config?: AxiosRequestConfig) => Promise<T>;
export declare const post: <T>(url: string, data?: object, config?: AxiosRequestConfig) => Promise<T>;
export declare const getWithToken: <T>(url: string, config?: AxiosRequestConfig) => Promise<T>;
export declare const postWithToken: <T>(url: string, data?: object, config?: AxiosRequestConfig) => Promise<T>;
