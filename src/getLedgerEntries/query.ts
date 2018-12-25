import { getEnvironmentVariable } from '../common/get-environment-variable';
import { request } from '../common/request';
import * as fs from 'fs';
import * as path from 'path';

interface IResponse {
  getLedgerEntries: LedgerEntries;
}

type LedgerEntries = {
  id: string;
}[]

export async function getLedgerEntries(): Promise<LedgerEntries> {
  const response = await request<IResponse>({
    apiKey: getEnvironmentVariable('APPSYNC_API_KEY'),
    query: fs.readFileSync(path.resolve(__dirname, './query.graphql')).toString('utf8'),
    url: getEnvironmentVariable('APPSYNC_API_URL'),
  });
  return response.getLedgerEntries;
}
