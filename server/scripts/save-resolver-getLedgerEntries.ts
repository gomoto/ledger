import * as fs from 'fs';
import * as path from 'path';
import { saveResolver } from './core/save-resolver';

async function main() {
  const response = await saveResolver({
    typeName: 'Query',
    fieldName: 'getLedgerEntries',
    dataSourceName: 'LedgerEntryTable',
    requestMappingTemplate: fs.readFileSync(path.resolve(__dirname, '../src/getLedgerEntries/request-mapping.vm')).toString('utf8'),
    responseMappingTemplate: fs.readFileSync(path.resolve(__dirname, '../src/getLedgerEntries/response-mapping.vm')).toString('utf8'),
  });
  console.log('Saved resolver for getLedgerEntries');
  console.log(response);
}

main()
.catch((error) => {
  console.error('Failed to save resolver for getLedgerEntries');
  console.error(error);
  process.exit(1);
})
