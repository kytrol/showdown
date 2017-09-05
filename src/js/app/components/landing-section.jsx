import { h, Component } from 'preact';
import { route } from 'preact-router';

export default class LandingSection extends Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    const uri = this.props.title.split(' ')[0].toLowerCase();
    route(`/${uri}`);
  }

  render() {
    return (
      <div onClick={this.handleClick}>
        <h3>{this.props.title}</h3>
      </div>
    );
  }
}
