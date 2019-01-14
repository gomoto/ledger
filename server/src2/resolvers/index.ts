import {
  MutationToCreateLedgerEntryResolver,
  QueryToGetLedgerEntriesResolver,
  LedgerEntry,
  LedgerEntryCreationInput,
} from '../graphql-types';
import {datastore} from '../datastore';
import {buildId} from '../build-id';
import Datastore = require('@google-cloud/datastore');

interface QueryResponseEntityDatastoreKey {
  id: string;
  kind: string;
  namespace: string;
  // path: any;
}

type QueryResponseEntity<T> = T & {[Datastore.KEY]: QueryResponseEntityDatastoreKey};

const getLedgerEntries: QueryToGetLedgerEntriesResolver = async function() {
  const query = datastore.createQuery('LedgerEntry');
  const response = await datastore.runQuery(query);
  const entities = response[0];
  const ledgerEntries: LedgerEntry[] = entities.map((entity: QueryResponseEntity<LedgerEntry>) => {
    const key = entity[Datastore.KEY];
    return {
      id: buildId(key),
      amount: entity.amount,
      creator: entity.creator,
    };
  });
  return ledgerEntries;
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
    return buildId({id: key.id, kind: key.kind});
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
