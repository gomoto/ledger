import { deleteResolver } from './delete-resolver';

async function main() {
  const response = await deleteResolver({
    typeName: 'Mutation',
    fieldName: 'createLedgerEntry',
  });
  console.log('Deleted resolver for createLedgerEntry');
  console.log(response);
}

main()
.catch((error) => {
  console.error('Failed to delete resolver for createLedgerEntry');
  console.error(error);
  process.exit(1);
})
