import { h, Component } from 'preact';
import Search from '../components/search.jsx';
import PersonList from '../components/person-list.jsx';
import { search } from '../util/fetch';

/**
 * Person Search Component.
 */
export default class PersonSearch extends Component {
  /**
   * Attaches props to component.
   * @param {Object} props  Props passed to component
   */
  constructor(props) {
    super(props);

    this.fetchPeople = this.fetchPeople.bind(this);
  }

  /**
   * Fetches person data with search term.
   * @param {String} searchTerm  Term to search with
   */
  fetchPeople(searchTerm) {
    const { resource, addSearch } = this.props;
    search(resource, searchTerm)
      .then(results => addSearch({ resource, searchTerm, results }))
      .catch(e => console.error(`Failed to fetch people :- ${e}`));
  }

  /**
   * Renders component.
   * @return {String}  Person Search Component
   */
  render() {
    const { peopleInfo, onSearchInput, resource } = this.props;
    const { searchTerm, searches } = peopleInfo;
    return (
      <section class='person-search'>
        <Search
          placeholder='Search for a person...'
          onSearchInput={evt => {
            const searchTerm = evt.target.value;
            onSearchInput(searchTerm, resource, _ => {
              this.fetchPeople(searchTerm);
            });
          }}
        />
      {searches[searchTerm] && <PersonList people={searches[searchTerm]} />}
      </section>
    );
  }
}
