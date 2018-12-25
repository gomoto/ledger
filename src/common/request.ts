import fetch from 'node-fetch';
import { HttpError } from './http-error';

export interface IRequestOptions {
  apiKey: string;
  query: string;
  url: string;
}

interface IResponse<T> {
  data: T;
}

export async function request<T>(options: IRequestOptions): Promise<T> {
  const response = await fetch(options.url, {
    method: 'POST',
    headers: {
      'X-Api-Key': options.apiKey,
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: options.query,
      // variables: {}
    }),
  });
  if (!response.ok) {
    throw new HttpError(response.status, await response.json());
  }
  const contentType = response.headers.get('Content-Type');
  if (contentType && contentType.includes('application/json')) {
    const body: IResponse<T> = await response.json();
    return body.data;
  }
}
