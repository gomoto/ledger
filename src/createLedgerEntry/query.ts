import { getEnvironmentVariable } from '../common/get-environment-variable';
import { request } from '../common/request';
import * as fs from 'fs';
import * as path from 'path';

interface IResponse {
  createLedgerEntry: LedgerEntry;
}

interface LedgerEntry {
  id: string;
}

export async function createLedgerEntry(): Promise<LedgerEntry> {
  const response = await request<IResponse>({
    apiKey: getEnvironmentVariable('APPSYNC_API_KEY'),
    query: fs.readFileSync(path.resolve(__dirname, './query.graphql')).toString('utf8'),
    url: getEnvironmentVariable('APPSYNC_API_URL'),
  });
  return response.createLedgerEntry;
}
