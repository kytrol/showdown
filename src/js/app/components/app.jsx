import { h, Component } from 'preact';
import Router from 'preact-router';
import Home from '../containers/home.jsx';
import ShowSearch from '../containers/show-search.jsx';
import PersonSearch from '../containers/person-search.jsx';
import Schedule from '../containers/schedule.jsx';
import NotFound from '../containers/not-found.jsx';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      searches: []
    };

    this.addSearch = this.addSearch.bind(this);
  }

  addSearch({ search, results }) {
    this.setState((prevState) => {
      const { searches } = prevState;
      searches.push({ search, results });
      return { searches };
    });
  }

  render() {
    return (
      <Router>
        <Home path='/' />
        <ShowSearch path='/show' />
        <PersonSearch path='/person' />
        <Schedule path='/schedule' />
        <NotFound default />
      </Router>
    );
  }
}
