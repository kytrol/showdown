import { h, Component } from 'preact';
import Search from '../components/search.jsx';
import ShowList from '../components/show-list.jsx';
import { search } from '../util/fetch';

/**
 * Show Search Component
 */
export default class ShowSearch extends Component {
  /**
   * Attaches props to component.
   * @param {Object} props  Props passed to component
   */
  constructor(props) {
    super(props);

    this.fetchShows = this.fetchShows.bind(this);
  }

  /**
   * Fetches show data with search term.
   * @param {String} searchTerm  Term to search with
   */
  fetchShows(searchTerm) {
    const { addSearch, resource } = this.props;
    search(resource, searchTerm)
      .then(results => addSearch({ resource, searchTerm, results }))
      .catch(e => console.error(`Failed to fetch shows :- ${e}`));
  }

  /**
   * Renders component.
   * @return {Component}  Show Search Component
   */
  render() {
    const { showInfo, onSearchInput, resource } = this.props;
    const { searchTerm, searches } = showInfo;
    return (
      <section class='show-search'>
        <Search
          placeholder='Search for a show...'
          onSearchInput={evt => {
            const searchTerm = evt.target.value;
            onSearchInput(searchTerm, resource, _ => {
              this.fetchShows(searchTerm);
            });
          }}
        />
        {searches[searchTerm] && <ShowList shows={searches[searchTerm]} />}
      </section>
    );
  }
}
