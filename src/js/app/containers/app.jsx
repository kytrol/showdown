import { h, Component } from 'preact';
import debounce from 'debounce';
import Router from 'preact-router';
import Home from '../components/home.jsx';
import ShowSearch from './show-search.jsx';
import PersonSearch from './person-search.jsx';
import Schedule from './schedule.jsx';
import NotFound from '../components/not-found.jsx';
import DetailView from '../components/detail-view.jsx';

/**
 * App Component.
 */
export default class App extends Component {
  /**
   * Attaches props to component and initializes state.
   * @param {Object} props  Props passed to component
   */
  constructor(props) {
    super(props);

    this.state = {
      shows: {
        searchTerm: '',
        searches: []
      },
      people: {
        searchTerm: '',
        searches: []
      }
    };

    this.addSearch = this.addSearch.bind(this);
    this.onSearchInput = this.onSearchInput.bind(this);
  }

  /**
   * Debounces call to onSearchInput.
   */
  componentWillMount() {
    this.onSearchInput = debounce(this.onSearchInput, 300);
  }

  /**
   * Retrieves data for search term from cache, if available,
   * or API.
   * @param {String}   searchTerm    Term to search with
   * @param {String}   resource      Category of data
   *                                 Ex. 'show' or 'person'
   * @param {Function} performFetch  Retrieves data from API
   */
  onSearchInput(searchTerm, resource, performFetch) {
    const { searches } = this.state[resource];
    if (searches[searchTerm]) {
      this.addSearch({ resource, searchTerm, results: searches[searchTerm] });
    } else {
      performFetch();
    }
  }

  /**
   * Adds a search result to the state.
   * @param {String} resource    Category of data
   *                             Ex. 'show' or 'person'
   * @param {String} searchTerm  Term to search with
   * @param {Array}  results     Search results from API
   */
  addSearch({ resource, searchTerm, results }) {
    this.setState(prevState => ({
      ...prevState,
      [resource]: {
        searchTerm,
        searches: {
          ...prevState[resource].searches,
          [searchTerm]: results
        }
      }
    }));
  }

  /**
   * Renders component
   * @return {Component}  App Component
   */
  render() {
    const { shows, people } = this.state;

    return (
      <Router>
        <Home path='/' />
        <ShowSearch
          path='/show'
          addSearch={this.addSearch}
          resource='shows'
          showInfo={shows}
          onSearchInput={this.onSearchInput}
        />
        <PersonSearch
          path='/person'
          addSearch={this.addSearch}
          resource='people'
          peopleInfo={people}
          onSearchInput={this.onSearchInput}
        />
        <Schedule path='/schedule' />
        <DetailView
          path='/show/:id'
          shows={shows.searches[shows.searchTerm]}
          resource='shows'
        />
        <DetailView
          path='/person/:id'
          people={people.searches[people.searchTerm]}
          resource='people'
        />
        <NotFound default />
      </Router>
    );
  }
}
