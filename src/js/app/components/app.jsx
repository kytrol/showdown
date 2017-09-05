import { h, Component } from 'preact';
import Header from '../containers/header.jsx';
import Landing from '../containers/landing.jsx';

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
      <main>
        <Header />
        <Landing />
      </main>
    );
  }
}
