import React from 'react';
import { LedgerEntry } from './LedgerEntry';

export interface LedgerEntryListProps {
  ledgerEntries: LedgerEntry[];
}

export class LedgerEntryList extends React.Component<LedgerEntryListProps> {
  render() {
    const ledgerEntries = this.props.ledgerEntries ? this.props.ledgerEntries.map((ledgerEntry) => {
      return (
        <li key={ledgerEntry.id}>
          <div>
            <label>Amount: </label>
            <span>{ledgerEntry.amount}</span>
          </div>
          <div>
            <label>Creator: </label>
            <span>{ledgerEntry.creator}</span>
          </div>
        </li>
      );
    }) : [];
    return (
      <section>
        <h1>Ledger entries</h1>
        <ul>{ledgerEntries}</ul>
      </section>
    );
  }
}
