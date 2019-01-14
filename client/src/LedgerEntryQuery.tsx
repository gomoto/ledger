import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import { LedgerEntry } from './LedgerEntry';

const query = gql`
query Q {
  getLedgerEntries {
    id
    amount
    creator
  }
}
`

export class LedgerEntryQuery extends React.Component {
  render() {
    return (
      <Query query={query}>
        {({ loading, error, data }) => {
          if (loading) return <p>Loading...</p>;
          if (error) return <p>Error :(</p>;
          const ledgerEntries: LedgerEntry[] = data.getLedgerEntries;
          return ledgerEntries.map(({id, amount, creator}) => (
            <ul key={id}>
              <li>{creator}: ${amount}</li>
            </ul>
          ));
        }}
      </Query>
    );
  }
}
