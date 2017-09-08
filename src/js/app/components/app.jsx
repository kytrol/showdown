import { h } from 'preact';
import Router from 'preact-router';
import Home from './home.jsx';
import ShowSearch from '../containers/show-search.jsx';
import PersonSearch from '../containers/person-search.jsx';
import Schedule from '../containers/schedule.jsx';
import NotFound from './not-found.jsx';

const App = () => (
  <Router>
    <Home path='/' />
    <ShowSearch path='/show' />
    <PersonSearch path='/person' />
    <Schedule path='/schedule' />
    <NotFound default />
  </Router>
);

export default App;
