import * as fs from 'fs';
import * as path from 'path';
import { saveResolver } from './save-resolver';

async function main() {
  const response = await saveResolver({
    typeName: 'Mutation',
    fieldName: 'createLedgerEntry',
    dataSourceName: 'LedgerEntryTable',
    requestMappingTemplate: fs.readFileSync(path.resolve(__dirname, '../src/createLedgerEntry/request-mapping.vm')).toString('utf8'),
    responseMappingTemplate: fs.readFileSync(path.resolve(__dirname, '../src/createLedgerEntry/response-mapping.vm')).toString('utf8'),
  });
  console.log('Saved resolver for createLedgerEntry');
  console.log(response);
}

main()
.catch((error) => {
  console.error('Failed to save resolver for createLedgerEntry');
  console.error(error);
  process.exit(1);
})
