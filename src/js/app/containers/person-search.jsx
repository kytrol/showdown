import { h, Component } from 'preact';
import Search from '../components/search.jsx';
import PersonList from '../components/person-list.jsx';
import debounce from 'debounce';
import { get } from '../util/fetch';

export default class PersonSearch extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchTerm: '',
      searches: {}
    };

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

  fetchPeople(searchTerm) {
    get('people', searchTerm)
      .then(results => this.addSearch({ searchTerm, results }))
      .catch(e => console.error(`Failed to fetch people :- ${e}`));
  }

  onSearchInput(evt) {
    const searchTerm = evt.target.value;
    const { searches } = this.state;
    if (searches[searchTerm]) {
      this.addSearch({ searchTerm, results: searches[searchTerm] });
    } else {
      this.fetchPeople(searchTerm);
    }
  }

  render() {
    const { searchTerm, searches } = this.state;
    return (
      <section class='person-search'>
        <Search
          placeholder='Search for a person...'
          onSearchInput={this.onSearchInput}
        />
      {searches[searchTerm] && <PersonList people={searches[searchTerm]} />}
      </section>
    );
  }
}
