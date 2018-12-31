import React from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import './App.css';
import { Home } from './Home';
import { LedgerEntryCreator } from './LedgerEntryCreator';
import { LedgerEntryList } from './LedgerEntryList';

export class App extends React.Component {
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
          <Route path="/" exact component={Home} />
          <Route path="/create-entry" component={LedgerEntryCreator} />
          <Route path="/list-entries" component={LedgerEntryList} />
        </main>
      </BrowserRouter>
    );
  }
}
