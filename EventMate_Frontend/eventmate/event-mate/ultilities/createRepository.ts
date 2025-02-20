/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { Agent } from 'https';
import { mapValues } from 'lodash';



export type RequestResponse<ResponseData> = AxiosResponse<ResponseData> & {
    error?: any;
};

type InputFunction<P extends any[], D> = (fetch: typeof fetcher, ...args: P) => Promise<D>;

type CreateRepositoryInput = {
    [key: string]: InputFunction<any, any>;
};

type CreateRepositoryOutput<
    Input extends CreateRepositoryInput,
    Keys extends keyof Input = keyof Input,
> = {
    [P in Keys]: Input[P] extends InputFunction<infer P, infer D>
        ? (...args: P) => Promise<D>
        : never;
};

export default function createRepository<Input extends CreateRepositoryInput>(
    input: Input
): CreateRepositoryOutput<Input> {
    return mapValues(input, (resourceCreator) => {
        return (...args: any[]) => {
            return resourceCreator(fetcher, ...args);
        };
    }) as CreateRepositoryOutput<Input>;
}

const axiosInstance = axios.create({
    headers: {
        'Access-Control-Allow-Origin': '*',
    },
});

const responseHandler = (response: any) => {
    // format response: {key: string, body: any}
   
    return {
        ...response,
        data: response?.token,
    };
};

// config reasponse handler
axiosInstance.interceptors.response.use(responseHandler, null);



export const fetcher = <ResponseData = any>(
    url: string,
    config?: AxiosRequestConfig
): Promise<RequestResponse<ResponseData>> => {
  
    return axiosInstance
        .request<ResponseData>({
            ...config,
            url,
            httpsAgent: new Agent({ rejectUnauthorized: false }),
            params: {
                ...config?.params,
            },
            headers: {
                ...config?.headers,
                Authorization: `Bearer ${localStorage.getItem('token')}` || '',
            },
     
        })
        .catch((error: any) => {
            return {
                ...error.response,
                error,
            } as RequestResponse<ResponseData>;
        });
};
