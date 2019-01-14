export interface ApproximateDatastoreKey {
  id: string;
  kind: string;
}

// Build resource id from datastore key
export function buildId(key: ApproximateDatastoreKey): string {
  return `${key.kind}-${key.id}`;
}
