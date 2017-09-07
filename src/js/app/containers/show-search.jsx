import { h, Component } from 'preact';
import Search from '../components/search.jsx';

export default class ShowSearch extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searches: []
    };

    this.addSearch = this.addSearch.bind(this);
  }

  addSearch(result) {
    this.setState((prevState) => {
      const { searches } = prevState;
      searches.push(result);
      console.log('searches', searches);
      return { searches };
    });
  }

  render() {
    console.log('render:', this.state);
    return (
      <section class='show-search'>
        <Search
          placeholder='Search for a show...'
          addSearch={this.addSearch}
        />
      </section>
    );
  }
}
