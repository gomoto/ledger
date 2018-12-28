// Create or update resolver

import { AppSync }  from 'aws-sdk';
import * as fs from 'fs';
import * as path from 'path';
import { promisify } from 'util';

const appsync = new AppSync({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

const getResolver = promisify<AppSync.GetResolverRequest, AppSync.GetResolverResponse>(appsync.getResolver.bind(appsync));
const createResolver = promisify<AppSync.CreateResolverRequest, AppSync.CreateResolverResponse>(appsync.createResolver.bind(appsync));
const updateResolver = promisify<AppSync.UpdateResolverRequest, AppSync.UpdateResolverResponse>(appsync.updateResolver.bind(appsync));

async function main() {
  // First, does resolver already exist?
  let doesResolverExist: boolean;
  try {
    const getResolverRequest = {
      apiId: process.env.APPSYNC_API_ID,
      typeName: 'Query',
      fieldName: 'getLedgerEntries',
    };
    await getResolver(getResolverRequest);
    doesResolverExist = true;
  } catch (e) {
    doesResolverExist = false;
  }
  const createOrUpdateResolverRequest = {
    apiId: process.env.APPSYNC_API_ID,
    typeName: 'Query',
    fieldName: 'getLedgerEntries',
    dataSourceName: 'LedgerEntryTable',
    requestMappingTemplate: fs.readFileSync(path.resolve(__dirname, '../src/getLedgerEntries/request-mapping.vm')).toString('utf8'),
    responseMappingTemplate: fs.readFileSync(path.resolve(__dirname, '../src/getLedgerEntries/response-mapping.vm')).toString('utf8'),
    kind: 'UNIT',
  };
  let response: AppSync.CreateResolverResponse | AppSync.UpdateResolverResponse;
  if (doesResolverExist) {
    response = await updateResolver(createOrUpdateResolverRequest);
  } else {
    response = await createResolver(createOrUpdateResolverRequest);
  }
  console.log('Saved resolver');
  console.log(response);
}

main()
.catch((error) => {
  console.error('Failed to save resolver');
  console.error(error);
  process.exit(1);
})
