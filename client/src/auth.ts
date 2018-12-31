import * as auth0 from 'auth0-js';
import { promisify } from 'es6-promisify';
import { createBrowserHistory } from 'history';
import { decode } from 'jsonwebtoken';
import * as settings from './settings.json';

// Note: Access token local source of truth is local storage
const localStorageAccessTokenKey = 'accessToken';

const history = createBrowserHistory();

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

export async function authenticate(): Promise<void> {
  if (window.location.pathname === settings.AUTH0_CALLBACK_PATH) {
    // User redirected from Auth0 with access token in URL hash.
    await authenticationCallback();
  } else {
    // User navigated directly to application.
    // Consider user authenticated if user can get a valid access token.
    await getAccessToken();
  }
}

export function logout(): void {
  localStorage.removeItem(localStorageAccessTokenKey);
  webAuth.logout({
    returnTo: host,
  });
}

/**
 * Get unexpired access token.
 */
export async function getAccessToken(): Promise<string> {
  // 1. Get access token from localStorage.
  const localStorageAccessToken = localStorage.getItem(localStorageAccessTokenKey);
  if (localStorageAccessToken && !isAccessTokenExpired(localStorageAccessToken)) {
    return localStorageAccessToken;
  }
  // 2. Get access token from Auth0 silent-authentication. This will work if user is still signed in via single-sign-on.
  const decodedHash = await renewAuth({
    redirectUri: `${host}${settings.AUTH0_SILENT_CALLBACK_PATH}`,
    usePostMessage: true,
    postMessageDataType: settings.AUTH0_SILENT_CALLBACK_MESSAGE_TYPE,
  });
  if (decodedHash.accessToken && !decodedHash.error) {
    const accessToken = decodedHash.accessToken;
    localStorage.setItem(localStorageAccessTokenKey, accessToken)
    return accessToken;
  }
  // 3. Get access token by redirecting to and from Auth0.
  webAuth.authorize({
    redirectUri: `${host}${settings.AUTH0_CALLBACK_PATH}?${orignalPathQueryKey}=${window.location.pathname}`,
  });
  throw new Error('Failed to get access token');
}

/**
 * @param accessToken Opaque JWT
 * @param expireAhead Expire the token earlier than its "exp" by this amount in seconds.
 */
function isAccessTokenExpired(accessToken: string, expireAhead = 60): boolean {
  const accessTokenPayload = decode(accessToken) as {exp: number};
  const expirationTimeSeconds = accessTokenPayload.exp - expireAhead;
  return expirationTimeSeconds * 1000 <= Date.now();
}

/**
 * Called when user arrives at application via Auth0 callback.
 * Saves access token in local storage, and redirects to the
 * original path request before the Auth0 authentication dance.
 */
async function authenticationCallback(): Promise<void> {
  const decodedHash = await parseHash({hash: window.location.hash});
  if (decodedHash === null) {
    throw new Error('Cannot parse hash from callback URL');
  }
  if (!decodedHash.accessToken) {
    throw new Error('Access token is empty');
  }
  localStorage.setItem(localStorageAccessTokenKey, decodedHash.accessToken);

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

export interface Auth0RenewAuthResponse extends auth0.Auth0DecodedHash {
  error: auth0.LoginRequiredErrorCode;
}
