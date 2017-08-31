'use strict';

import { h } from 'preact';
import SearchItem from './search-item.jsx';

const SearchList = ({ searches }) => (
  <div>
    {searches.map(search => <SearchItem search={search} />)}
  </div>
);

export default SearchList;
