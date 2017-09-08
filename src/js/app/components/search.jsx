import { h, Component } from 'preact';

export default class Search extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.searchField.focus();
  }

  render() {
    const { placeholder, onSearchInput } = this.props;

    return (
      <div class='search'>
        <div class='search-box'>
          <img src='assets/img/search.svg' alt='search' />
          <input
            type='text'
            placeholder={placeholder}
            autocomplete='off'
            ref={(input) => { this.searchField = input; }}
            onInput={onSearchInput}
          />
        </div>
      </div>
    );
  }
}
