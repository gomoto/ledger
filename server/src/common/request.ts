import fetch from 'node-fetch';
import { HttpError } from './http-error';
import { getEnvironmentVariable } from '../common/get-environment-variable';

export interface IRequestOptions {
  query: string;
}

interface IResponse<T> {
  data: T;
}

/**
 * Send request to AppSync GraphQL server.
 */
export async function request<T>(options: IRequestOptions): Promise<T> {
  const url = getEnvironmentVariable('APPSYNC_API_URL');
  const apiKey = getEnvironmentVariable('APPSYNC_API_KEY');
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'X-Api-Key': apiKey,
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
