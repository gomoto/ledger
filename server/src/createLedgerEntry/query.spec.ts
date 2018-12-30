import { createLedgerEntry } from './query';

async function main() {
  const ledgerEntry = await createLedgerEntry();
  console.log(ledgerEntry);
}

if (require.main === module) {
  main()
  .catch((error: Error) => console.error(error));
}
