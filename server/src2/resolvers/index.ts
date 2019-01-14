import {
  MutationToCreateLedgerEntryResolver,
  QueryToGetLedgerEntriesResolver,
  LedgerEntry,
} from '../graphql-types';
import {datastore} from '../datastore';
import Datastore = require('@google-cloud/datastore');
const uuidv4 = require('uuid/v4');

interface QueryResponseEntityDatastoreKey {
  // Use name, never id, for every datastore entity in this app
  id: never;
  name: string;
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
      id: key.name,
      amount: entity.amount,
      creator: entity.creator,
    };
  });
  return ledgerEntries;
}

const createLedgerEntry: MutationToCreateLedgerEntryResolver = async function(parent, args, context) {
  const id = uuidv4();
  const key = datastore.key(['LedgerEntry', id]);
  const data = {
    amount: args.input.amount,
    creator: args.input.creator,
  };
  const payload = {key, data};
  const result = await datastore.insert(payload);
  if (result) {
    return id;
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
