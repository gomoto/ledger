import {
  MutationToCreateLedgerEntryResolver,
  QueryToGetLedgerEntriesResolver,
  LedgerEntry,
  LedgerEntryCreationInput,
} from '../graphql-types';
import {datastore} from '../datastore';

const getLedgerEntries: QueryToGetLedgerEntriesResolver = async function() {
  const query = datastore.createQuery('LedgerEntry');
  const response = await datastore.runQuery(query);
  const entities = <LedgerEntry[]> response[0];
  return entities;
}

const createLedgerEntry: MutationToCreateLedgerEntryResolver = async function(parent, args, context) {
  const key = datastore.key(['LedgerEntry']);
  const data: LedgerEntryCreationInput = {
    amount: args.input.amount,
    creator: args.input.creator,
  };
  const payload = {key, data};
  const result = await datastore.insert(payload);
  if (result) {
    // Get id from original key object instead of mutation result.
    // Mutation result types don't match real object.
    // Original key object is mutated by insert() upon successful insert.
    return `${key.id}`;
  }
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
