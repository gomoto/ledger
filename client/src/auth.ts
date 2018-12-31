import * as auth0 from 'auth0-js';
import { promisify } from 'es6-promisify';
import { createBrowserHistory } from 'history';
import * as settings from './settings.json';

const history = createBrowserHistory();

// Access token for the application
let accessToken = '';

const host = `${window.location.protocol}//${window.location.host}`;
const orignalPathQueryKey = 'original_path';

const webAuth = new auth0.WebAuth({
  audience: settings.AUTH0_API_AUDIENCE,
  clientID: settings.AUTH0_CLIENT_ID,
  domain: settings.AUTH0_DOMAIN,
  responseType: 'token', // access token
  scope: 'read:ledger_entries create:ledger_entries',
});

const parseHash = promisify(webAuth.parseHash.bind(webAuth));
// renewAuth response type is any...
const renewAuth = promisify(<(options: auth0.RenewAuthOptions, cb: auth0.Auth0Callback<Auth0RenewAuthResponse>) => any> webAuth.renewAuth.bind(webAuth));

export async function authenticate(): Promise<AuthenticateResponse> {
  // Get access token from URL.
  // User redirected from Auth0 with access token in URL hash.
  if (window.location.pathname === settings.AUTH0_CALLBACK_PATH) {
    await authenticationCallback();
  }
  // Get access token from silent-authentication.
  // User navigated directly to application.
  else {
    await authenticateWithAuth0();

  }
  return {error: null};
}

export function logout(): void {
  webAuth.logout({
    returnTo: host,
  });
}

export function getAccessToken(): string {
  return accessToken;
}

function setAccessToken(token: string): void {
  accessToken = token;
}

/**
 * If user is signed in via SSO, get access token from Auth0.
 * If user is not signed in, redirect to Auth0 to start authentication flow.
 */
async function authenticateWithAuth0(): Promise<void> {
  const decodedHash = await renewAuth({
    redirectUri: `${host}${settings.AUTH0_SILENT_CALLBACK_PATH}`,
    usePostMessage: true,
    postMessageDataType: settings.AUTH0_SILENT_CALLBACK_MESSAGE_TYPE,
  });
  if (decodedHash.error === 'login_required') {
    webAuth.authorize({
      redirectUri: `${host}${settings.AUTH0_CALLBACK_PATH}?${orignalPathQueryKey}=${window.location.pathname}`,
    });
    console.warn('Login required');
    return;
  }
  if (!decodedHash.accessToken) {
    throw new Error('Access token is empty');
  }
  setAccessToken(decodedHash.accessToken);
}

/**
 * Called when user arrives at application via Auth0 callback.
 */
async function authenticationCallback(): Promise<void> {
  const decodedHash = await parseHash({hash: window.location.hash});
  if (decodedHash === null) {
    throw new Error('Cannot parse hash from callback URL');
  }
  if (!decodedHash.accessToken) {
    throw new Error('Access token is empty');
  }
  setAccessToken(accessToken);

  // Redirect to original path
  const url = new URL(window.location.href);
  const originalPath = url.searchParams.get(orignalPathQueryKey) || '/';
  history.push(originalPath);
}

/**
 * Used by silent-authentication.html
 */
export function silentAuthenticationCallback(): void {
  webAuth.parseHash({hash: window.location.hash}, (err, result) => {
    // Let silent-authentication callback know how to wait for the
    // right message by specifying a type within message data.
    const message: any = err || result;
    message.type = settings.AUTH0_SILENT_CALLBACK_MESSAGE_TYPE;
    parent.postMessage(message, host);
  });
}

export interface AuthenticateResponse {
  error: Error | null;
}

export interface Auth0RenewAuthResponse extends auth0.Auth0DecodedHash {
  error: auth0.LoginRequiredErrorCode;
}

export interface AuthenticationCallbackResponse {
  accessToken: string | null;
  error: Error | null;
}
