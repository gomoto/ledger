import { AppSync }  from 'aws-sdk';
import * as fs from 'fs';
import * as path from 'path';
import { sleep } from './sleep';
import { configuredAppSync as appsync } from './aws-appsync';

const startSchemaCreationRequest: AppSync.StartSchemaCreationRequest = {
  apiId: process.env.APPSYNC_API_ID,
  definition: fs.readFileSync(path.resolve(__dirname, '../src/schema.graphql')),
};

const getSchemaCreationStatusRequest: AppSync.GetSchemaCreationStatusRequest = {
  apiId: process.env.APPSYNC_API_ID,
};

async function main() {
  await appsync.startSchemaCreation(startSchemaCreationRequest);
  while (true) {
    const getSchemaCreationStatusResponse = await appsync.getSchemaCreationStatus(getSchemaCreationStatusRequest);
    if (getSchemaCreationStatusResponse.status !== 'PROCESSING') {
      console.log(getSchemaCreationStatusResponse);
      break;
    }
    await sleep(1000);
  }
}

main()
.catch((error) => {
  console.error('Failed to save schema');
  console.error(error);
  process.exit(1);
})
