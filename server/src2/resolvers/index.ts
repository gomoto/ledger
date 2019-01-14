import {LedgerEntry} from '../interfaces/ledger-entry';

async function getLedgerEntries(): Promise<LedgerEntry[]> {
  return [
    {id: 'dummy-id', amount: 8.12}
  ];
}

interface RootValue {}

interface Context {}

async function createLedgerEntry(
  parent: RootValue,
  args: {amount: number, creator: string},
  context: Context,
): Promise<LedgerEntry> {
  return {id: 'dummy-id', amount: args.amount, creator: args.creator};
}

// Resolvers for schema types
export const resolvers = {
  Query: {
    getLedgerEntries,
  },
  Mutation: {
    createLedgerEntry,
  },
};
