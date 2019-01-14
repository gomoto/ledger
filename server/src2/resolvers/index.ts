import {
  MutationToCreateLedgerEntryResolver,
  QueryToGetLedgerEntriesResolver,
  LedgerEntry,
} from '../graphql-types';
import {datastore} from '../datastore';

const getLedgerEntries: QueryToGetLedgerEntriesResolver = async function() {
  const query = datastore.createQuery('LedgerEntry');
  const response = await datastore.runQuery(query);
  const entities = <LedgerEntry[]> response[0];
  return entities;
}

const createLedgerEntry: MutationToCreateLedgerEntryResolver = async function(parent, args, context) {
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
