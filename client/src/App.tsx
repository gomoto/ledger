import React from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import './App.css';
import { Home } from './Home';
import { LedgerEntryCreator } from './LedgerEntryCreator';
import { LedgerEntryList } from './LedgerEntryList';
import { logout } from './auth';
import { LedgerEntry } from './LedgerEntry';

export interface AppProps {
  ledgerEntries: LedgerEntry[];
}

export class App extends React.Component<AppProps> {
  render() {
    return (
      <BrowserRouter>
        <main>
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/create-entry">Create entry</Link>
              </li>
              <li>
                <Link to="/list-entries">List entries</Link>
              </li>
            </ul>
          </nav>
          <button onClick={logout}>Logout</button>
          <Route path="/" exact component={Home} />
          <Route path="/create-entry" component={LedgerEntryCreator} />
          <Route path="/list-entries" component={LedgerEntryList} />
        </main>
      </BrowserRouter>
    );
  }
}
