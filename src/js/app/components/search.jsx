import { h, Component } from 'preact';

/**
 * Search Component.
 */
export default class Search extends Component {
  /**
   * Attaches props to component.
   * @param {Object} props  Props passed to component
   */
  constructor(props) {
    super(props);
  }

  /**
   * Focuses search input on component mount.
   */
  componentDidMount() {
    this.searchField.focus();
  }

  /**
   * Renders component.
   * @return {Component}  Search Component
   */
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
            ref={input => this.searchField = input}
            onInput={onSearchInput}
          />
        </div>
      </div>
    );
  }
}
