import { h, Component } from 'preact';
import Search from '../components/search.jsx';
import ShowList from './show-list.jsx';
import debounce from 'debounce';

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
    const url = `http://api.tvmaze.com/search/shows?q=${searchTerm}`;
    fetch(url)
      .then(res => res.json())
      .then(results => this.addSearch({ searchTerm, results }))
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
