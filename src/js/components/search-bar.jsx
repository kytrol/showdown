'use strict';

import { h, Component } from 'preact';
import linkState from 'linkstate';

export default class SearchBar extends Component {
  constructor() {
    super();
    this.doSearch = this.doSearch.bind(this);
    this.render = this.render.bind(this);
  }

  doSearch() {
    const { addSearch } = this.props;
    const { text } = this.state;
    const url = `http://api.tvmaze.com/search/shows?q=${text}`;
    fetch(url)
      .then(res => res.json())
      .then(results => addSearch({ search: text, results }))
      .catch(e => console.error(e));
  }

  render(props, { text }) {
    return (
      <div>
        <input value={text} onInput={linkState(this, 'text')} />
        <button onClick={this.doSearch}>
          Search
        </button>
      </div>
    );
  }
}
