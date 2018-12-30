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
    query: fs.readFileSync(path.resolve(__dirname, './query.graphql')).toString('utf8'),
  });
  return response.createLedgerEntry;
}
