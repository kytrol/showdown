import { h, Component } from 'preact';
import Search from '../components/search.jsx';
import ShowList from './show-list.jsx';

export default class ShowSearch extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchTerm: '',
      searches: {}
    };

    this.addSearch = this.addSearch.bind(this);
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

  render() {
    const { searchTerm, searches } = this.state;
    return (
      <section class='show-search'>
        <Search
          placeholder='Search for a show...'
          addSearch={this.addSearch}
        />
        {searches[searchTerm] && <ShowList shows={searches[searchTerm]} />}
      </section>
    );
  }
}
