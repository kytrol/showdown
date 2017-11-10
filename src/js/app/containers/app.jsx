import { h, Component } from 'preact';
import debounce from 'debounce';
import Router from 'preact-router';
import Home from '../components/home.jsx';
import ShowSearch from './show-search.jsx';
import PersonSearch from './person-search.jsx';
import Schedule from './schedule.jsx';
import NotFound from '../components/not-found.jsx';
import ShowDetail from '../components/show-detail.jsx';

export default class App extends Component {
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

  componentWillMount() {
    this.onSearchInput = debounce(this.onSearchInput, 300);
  }

  onSearchInput(searchTerm, resource, performFetch) {
    const { searches } = this.state[resource];
    if (searches[searchTerm]) {
      this.addSearch({ resource, searchTerm, results: searches[searchTerm] });
    } else {
      performFetch();
    }
  }

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
        <ShowDetail
          path='/show/:id'
          shows={shows.searches[shows.searchTerm]}
        />
        <NotFound default />
      </Router>
    );
  }
}
