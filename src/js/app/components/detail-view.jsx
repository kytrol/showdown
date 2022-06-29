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
   * @param   {String} path  Path to sliced
   * @return  {String}        Result type
   */
  getResultType(path = this.props.path) {
    return path.split('/')[1];
  }

  /**
   * Fetches details for a single person or show.
   * @param {Object} props       Props passed to component
   * @param {String} resultPath  Path from new props
   */
  async fetchDetails(props, resultPath) {
    const { resource, id } = props;
    const results = props[resource];
    let info;
    if (results) {
      const resultType = this.getResultType(resultPath);
      info = results.map(r => r[resultType]).find(r => r.id === Number(id));

      if (!info) {
        info = await getSingle(resource, id);
      }
    } else {
      info = await getSingle(resource, id);
    }

    this.setState(_ => ({ info }));
  }

  /**
   * Ensures component has data needed to render.
   */
  componentDidMount() {
    this.fetchDetails(this.props);
  }

  /**
   * Updates component when new props are received.
   * @param  {Object} newProps  New props
   */
  componentWillReceiveProps(newProps) {
    this.fetchDetails(newProps, newProps.path);
  }

  /**
   * Prevents component from rendering stale data.
   * @param  {Object}  newProps  New props
   * @return {Boolean} Whether component should update
   */
  shouldComponentUpdate(newProps) {
    return newProps.id === this.props.id;
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
        <CoverBox info={info} detailType={resultType} />
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
