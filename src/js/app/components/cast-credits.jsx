import { h, Component } from 'preact';
import { getCastCredits } from '../util/fetch';
import Credit from './credit.jsx';

/**
 * CastCredits Component
 */
export default class CastCredits extends Component {
  /**
   * Attaches props to component.
   * @param  {Object} props  Props passed to component
   */
  constructor(props) {
    super(props);

    this.state = [];
  }

  /**
   * Fetches cast credits on component mount.
   */
  async componentDidMount() {
    console.error('Mounting cast credits');
    console.log('this.props', this.props);
    const { id } = this.props;

    const rawCredits = await getCastCredits(id);
    console.error('fetching on people ', id);
    const credits = rawCredits.map(c => c._embedded);
    console.log('oldState', this.state);
    this.setState(_ => credits);
    console.log('newState', this.state);
  }

  /**
   * Renders component.
   * @return {Component}  CastCredits component
   */
  render() {
    return (
      <section class='cast-credits'>
        {this.state.length
          ? <h1>Characters</h1>
          : <h3>Does not appear in any shows.</h3>
        }
        <div class='credits'>
          {this.state.map(credit => (
            <Credit info={credit} onClick={this.props.onCreditClick} />
          ))}
        </div>
      </section>
    );
  }
}
