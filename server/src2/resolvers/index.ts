import {
  MutationToCreateLedgerEntryResolver,
  QueryToGetLedgerEntriesResolver,
} from '../graphql-types';

const getLedgerEntries: QueryToGetLedgerEntriesResolver = async function() {
  return [
    {id: 'dummy-id', amount: 8.12, creator: null}
  ];
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
