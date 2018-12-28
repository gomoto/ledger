import { AppSync }  from 'aws-sdk';
import * as fs from 'fs';
import * as path from 'path';
import { promisify } from 'util';
import { sleep } from './sleep';

const appsync = new AppSync({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

const startSchemaCreation = promisify<AppSync.StartSchemaCreationRequest, AppSync.StartSchemaCreationResponse>(appsync.startSchemaCreation.bind(appsync));
const getSchemaCreationStatus = promisify<AppSync.GetSchemaCreationStatusRequest, AppSync.GetSchemaCreationStatusResponse>(appsync.getSchemaCreationStatus.bind(appsync));

const startSchemaCreationRequest: AppSync.StartSchemaCreationRequest = {
  apiId: process.env.APPSYNC_API_ID,
  definition: fs.readFileSync(path.resolve(__dirname, '../src/schema/schema.graphql')),
};

const getSchemaCreationStatusRequest: AppSync.GetSchemaCreationStatusRequest = {
  apiId: process.env.APPSYNC_API_ID,
};

async function main() {
  const startSchemaCreationResponse = await startSchemaCreation(startSchemaCreationRequest);
  console.log(startSchemaCreationResponse);
  while (true) {
    const getSchemaCreationStatusResponse = await getSchemaCreationStatus(getSchemaCreationStatusRequest);
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
