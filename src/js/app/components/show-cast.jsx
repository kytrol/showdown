import { h, Component } from 'preact';
import { getShowWithCast } from '../util/fetch';
import CastMember from './cast-member.jsx';

/**
 * ShowCast component
 */
export default class ShowCast extends Component {
  /**
   * Attaches props to component.
   * @param  {Object} props  Props passed to component
   */
  constructor(props) {
    super(props);

    this.state = [];
  }

  /**
   * Fetches show cast on mount.
   */
  async componentDidMount() {
    console.log('props', this.props);
    const { id } = this.props;

    const request = await getShowWithCast(id);
    console.error('fetching on show ', id);
    console.log('castRequest', request);
    this.setState(() => request._embedded.cast);
  }

  /**
   * Renders component.
   * @return {Component}  ShowCast component
   */
  render() {
    console.log('castMember', this.state[0]);
    return (
      <div>
        <h1>Show Cast</h1>
        <ul class='credits'>
          {this.state.map(castMember => (
            <CastMember info={castMember} onClick={this.props.onMemberClick}/>
          ))}
        </ul>
      </div>
    );
  }
}
