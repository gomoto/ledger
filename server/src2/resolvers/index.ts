import {LedgerEntry} from '../interfaces/ledger-entry';

export function getLedgerEntries(): LedgerEntry[] {
  return [
    {id: 'dummy-id', amount: 8.12}
  ];
}

interface RootValue {}

interface Context {}

export async function createLedgerEntry(
  parent: RootValue,
  args: {amount: number, creator: string},
  context: Context,
): Promise<LedgerEntry> {
  return {id: 'dummy-id', amount: args.amount, creator: args.creator};
}
