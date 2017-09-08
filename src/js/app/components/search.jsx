import { h, Component } from 'preact';
import debounce from 'debounce';

export default class Search extends Component {
  constructor(props) {
    super(props);

    this.fetchShows = this.fetchShows.bind(this);
  }

  componentWillMount() {
    this.fetchShows = debounce(this.fetchShows, 300);
  }

  componentDidMount() {
    this.searchField.focus();
  }

  fetchShows(evt) {
    const searchTerm = evt.target.value;
    const url = `http://api.tvmaze.com/search/shows?q=${searchTerm}`;
    fetch(url)
      .then(res => res.json())
      .then(results => this.props.addSearch({ searchTerm, results }))
      .catch(e => console.error(e));
  }

  render() {
    const { placeholder } = this.props;

    return (
      <div class='search'>
        <div class='search-box'>
          <img src='assets/img/search.svg' alt='search' />
          <input
            type='text'
            placeholder={placeholder}
            autocomplete='off'
            ref={(input) => { this.searchField = input; }}
            onInput={this.fetchShows}
          />
        </div>
      </div>
    );
  }
}
