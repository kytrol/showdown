import { h, Component } from 'preact';
import { route } from 'preact-router';

/**
 * Landing Section Component.
 */
export default class LandingSection extends Component {
  /**
   * Attaches props to component.
   * @param {Object} props  Props passed to component
   */
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  /**
   * Routes to page corresponding to landing section clicked.
   */
  handleClick() {
    const uri = this.props.title.split(' ')[0].toLowerCase();
    route(`/${uri}`);
  }

  /**
   * Renders component.
   * @return {Component}  Landing Section Component
   */
  render() {
    return (
      <div onClick={this.handleClick}>
        <h3>{this.props.title}</h3>
      </div>
    );
  }
}
