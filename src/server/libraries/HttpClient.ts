import axios, { AxiosInstance, AxiosResponse } from 'axios';

abstract class HttpClient {
  protected readonly requestInstance: AxiosInstance;

  public constructor(baseURL: string) {
    this.requestInstance = axios.create({
      baseURL,
    });

    this._initializeResponseInterceptor();
  }

  private _handleResponse = ({ data }: AxiosResponse) => data;

  protected _handleError = (error: any) => Promise.reject(error);

  private _initializeResponseInterceptor = () => {
    this.requestInstance.interceptors.response.use(
      this._handleResponse,
      this._handleError,
    );
  };
}

export default HttpClient;
