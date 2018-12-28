// Create or update resolver

import { AppSync }  from 'aws-sdk';
import * as fs from 'fs';
import * as path from 'path';
import { configuredAppSync as appsync } from './aws-appsync';

async function main() {
  // First, does resolver already exist?
  let doesResolverExist: boolean;
  try {
    const getResolverRequest = {
      apiId: process.env.APPSYNC_API_ID,
      typeName: 'Query',
      fieldName: 'getLedgerEntries',
    };
    await appsync.getResolver(getResolverRequest);
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
    response = await appsync.updateResolver(createOrUpdateResolverRequest);
  } else {
    response = await appsync.createResolver(createOrUpdateResolverRequest);
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
