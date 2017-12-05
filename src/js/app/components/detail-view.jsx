import { h, Component } from 'preact';
import { getSingle } from '../util/fetch';
import CoverBox from './cover-box.jsx';
import ShowDetail from './show-detail.jsx';
import PersonDetail from './person-detail.jsx';

/**
 * Detail View Component
 */
export default class DetailView extends Component {
  /**
   * Attaches props to component.
   * @param {Object} props  Props passed to component
   */
  constructor(props) {
    super(props);

    this.state = {};

    this.getResultType = this.getResultType.bind(this);
  }

  /**
   * Returns the type of results. ex. 'show' or 'person'
   * @return {String}  Result type
   */
  getResultType() {
    const { path } = this.props;
    return path.split('/')[1];
  }

  /**
   * Ensures component has data needed to render.
   */
  async componentDidMount() {
    const { resource, id } = this.props;
    const results = this.props[resource];
    let info;
    if (results) {
      const resultType = this.getResultType();
      info = results.map(r => r[resultType]).find(r => r.id === Number(id));
    } else {
      info = await getSingle(resource, id);
    }

    this.setState(_ => ({ info }));
  }

  /**
   * Renders component.
   * @return {Component}  Detail View Component
   */
  render() {
    const { info } = this.state;

    if (!info) {
      return null;
    }

    const resultType = this.getResultType();

    return (
      <section class='detail-view'>
        <CoverBox info={info} />
        {(resultType === 'show') && (
          <ShowDetail info={info} />
        )}
        {(resultType === 'person') && (
          <PersonDetail info={info} />
        )}
      </section>
    );
  }
}
