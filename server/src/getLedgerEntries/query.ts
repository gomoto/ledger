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
    query: fs.readFileSync(path.resolve(__dirname, './query.graphql')).toString('utf8'),
  });
  return response.getLedgerEntries;
}
