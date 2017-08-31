'use strict';

import { h, Component } from 'preact';
import SearchBar from './search-bar.jsx';
import SearchList from './search-list.jsx';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      searches: []
    };

    this.addSearch = this.addSearch.bind(this);
  }

  addSearch({ search, results }) {
    this.setState((prevState) => {
      const { searches } = prevState;
      searches.push({ search, results });
      return { searches };
    });
  }

  render(props, state) {
    return (
      <div>
        <SearchBar addSearch={this.addSearch} />
        <SearchList searches={state.searches} />
      </div>
    );
  }
}
