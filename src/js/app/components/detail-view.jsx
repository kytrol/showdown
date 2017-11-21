import { h, Component } from 'preact';
import { getSingle } from '../util/fetch';

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
  }

  /**
   * Ensures component has data needed to render.
   */
  async componentDidMount() {
    const { resource, id, path } = this.props;
    const results = this.props[resource];
    let info;
    if (results) {
      const resultType = path.split('/')[1];
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

    const imgExists = info.image && info.image.medium;

    return (
      <section class='detail-view'>
        <div class='cover-box'>
          <div
            class='cover'
            style={imgExists
              ? { backgroundImage: `url(${info.image.medium})` }
              : {}}
          />
          <h1>{info.name}</h1>
          <div class='img-box'>
            {imgExists && (
              <img
                src={info.image.medium}
                width='210'
                height='295'
                alt='show cover art'
              />
            )}
          </div>
          {(info.genres && info.genres.length > 0) && (
            <ul class='genres'>
              {info.genres.map(genre => <li>{genre}</li>)}
            </ul>
          )}
          {info.runtime && <p>({info.runtime}min)</p>}
          {(info.rating && info.rating.average) && (
            <h3>{info.rating.average}</h3>
          )}
        </div>
        {info.summary && (
          <div
            class='description'
            dangerouslySetInnerHTML={{ __html: info.summary }}
          />
        )}
      </section>
    );
  }
}
