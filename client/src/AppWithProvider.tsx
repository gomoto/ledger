import React from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import * as settings from './settings.json';
import { LedgerEntryQuery } from './LedgerEntryQuery';
import { AppGql } from './AppGql';
import { getAccessToken } from './auth';

const client = new ApolloClient({
  uri: settings.SERVER_URL,
  request: async (operation) => {
    const accessToken = await getAccessToken();
    // add authorization header to fetch options
    operation.setContext({
      headers: {
        Authorization: `Bearer ${accessToken}`,
      }
    });
  }
});

export class AppWithProvider extends React.Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <LedgerEntryQuery />
      </ApolloProvider>
    );
  }
}
