import { getLedgerEntries } from './query';

async function main() {
  const ledgerEntries = await getLedgerEntries();
  console.log(ledgerEntries);
}

if (require.main === module) {
  main()
  .catch((error: Error) => console.error(error));
}
