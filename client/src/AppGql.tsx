import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { App } from './App';

const getLedgerEntries = gql`
  query getLedgerEntries {
    getLedgerEntries {
      id
      amount
      creator
    }
  }
`

export const AppGql = graphql(getLedgerEntries, {
  options: {
    fetchPolicy: 'cache-and-network'
  },
  props: (response: any) => ({
    ledgerEntries: response.data.getLedgerEntries || []
  }),
})(App)
