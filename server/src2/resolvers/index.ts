import {LedgerEntry} from '../interfaces/ledger-entry';

export function getLedgerEntries(): LedgerEntry[] {
  return [
    {id: 'dummy-id', amount: 8.12}
  ];
}
