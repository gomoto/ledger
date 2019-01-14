import Datastore = require('@google-cloud/datastore');

export const datastore = new Datastore({
  // namespace: default namespace
  projectId: 'ledger',
  keyFilename: './keyfile.json', // relative to package.json
});
