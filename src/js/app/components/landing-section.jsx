import { h, Component } from 'preact';

export default class LandingSection extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <h3>{this.props.title}</h3>
      </div>
    );
  }
}
