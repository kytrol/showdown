import { h, Component } from 'preact';
import Search from '../components/search.jsx';
import ShowList from '../components/show-list.jsx';
import debounce from 'debounce';
import { get } from '../util/fetch';

export default class ShowSearch extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchTerm: '',
      searches: {}
    };

    this.addSearch = this.addSearch.bind(this);
    this.fetchShows = this.fetchShows.bind(this);
    this.onSearchInput = this.onSearchInput.bind(this);
  }

  componentWillMount() {
    this.onSearchInput = debounce(this.onSearchInput, 300);
  }

  addSearch({ searchTerm, results }) {
    this.setState(prevState => ({
      ...prevState,
      searchTerm,
      searches: {
        ...prevState.searches,
        [searchTerm]: results
      }
    }));
  }

  fetchShows(searchTerm) {
    const resource = 'shows';
    get(resource, searchTerm)
      .then(results => this.addSearch({ resource, searchTerm, results }))
      .catch(e => console.error(`Failed to fetch shows :- ${e}`));
  }

  onSearchInput(evt) {
    const searchTerm = evt.target.value;
    const { searches } = this.state;
    if (searches[searchTerm]) {
      this.addSearch({ searchTerm, results: searches[searchTerm] });
    } else {
      this.fetchShows(searchTerm);
    }
  }

  render() {
    const { searchTerm, searches } = this.state;
    return (
      <section class='show-search'>
        <Search
          placeholder='Search for a show...'
          onSearchInput={this.onSearchInput}
        />
        {searches[searchTerm] && <ShowList shows={searches[searchTerm]} />}
      </section>
    );
  }
}
