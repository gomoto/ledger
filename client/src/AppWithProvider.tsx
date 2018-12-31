import React from 'react';
import AWSAppSyncClient, { AUTH_TYPE } from 'aws-appsync';
import { ApolloProvider } from 'react-apollo';
import { Rehydrated } from 'aws-appsync-react';
import * as settings from './settings.json';

import { App } from './App';
import { getAccessToken } from './auth';

const client = new AWSAppSyncClient({
  url: settings.APPSYNC_URL,
  region: settings.APPSYNC_REGION,
  auth: {
    type: AUTH_TYPE.OPENID_CONNECT,
    jwtToken: async () => await getAccessToken(),
  },
});

export class AppWithProvider extends React.Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <Rehydrated>
          <App />
        </Rehydrated>
      </ApolloProvider>
    );
  }
}
