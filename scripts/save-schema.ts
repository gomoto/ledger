import * as fs from 'fs';
import * as path from 'path';
import { sleep } from './sleep';
import { appsync } from './aws-appsync';

async function main() {
  // Save schema
  await appsync.startSchemaCreation({
    apiId: process.env.APPSYNC_API_ID,
    definition: fs.readFileSync(path.resolve(__dirname, '../src/schema.graphql')),
  });
  // Wait for schema creation to be SUCCESS or FAILED
  while (true) {
    const getSchemaCreationStatusResponse = await appsync.getSchemaCreationStatus({
      apiId: process.env.APPSYNC_API_ID,
    });
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
