import { deleteResolver } from './delete-resolver';

async function main() {
  const response = await deleteResolver({
    typeName: 'Query',
    fieldName: 'getLedgerEntries',
  });
  console.log('Deleted resolver for getLedgerEntries');
  console.log(response);
}

main()
.catch((error) => {
  console.error('Failed to delete resolver for getLedgerEntries');
  console.error(error);
  process.exit(1);
})
