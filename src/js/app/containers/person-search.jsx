import { h, Component } from 'preact';
import Search from '../components/search.jsx';
import PersonList from '../components/person-list.jsx';
import { get } from '../util/fetch';

export default class PersonSearch extends Component {
  constructor(props) {
    super(props);

    this.fetchPeople = this.fetchPeople.bind(this);
  }

  fetchPeople(searchTerm) {
    const { resource, addSearch } = this.props;
    get(resource, searchTerm)
      .then(results => addSearch({ resource, searchTerm, results }))
      .catch(e => console.error(`Failed to fetch people :- ${e}`));
  }

  render() {
    const { peopleInfo, onSearchInput, resource } = this.props;
    const { searchTerm, searches } = peopleInfo;
    return (
      <section class='person-search'>
        <Search
          placeholder='Search for a person...'
          onSearchInput={(evt) => {
            const searchTerm = evt.target.value;
            onSearchInput(searchTerm, resource, () => {
              this.fetchPeople(searchTerm);
            });
          }}
        />
      {searches[searchTerm] && <PersonList people={searches[searchTerm]} />}
      </section>
    );
  }
}
