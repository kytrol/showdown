import { h, Component } from 'preact';
import { getSingle } from '../util/fetch';

export default class ShowDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  async componentDidMount() {
    const { shows, id } = this.props;
    let info;
    if (shows) {
      info = shows.map(s => s.show).find(show => show.id === Number(id));
    } else {
      info = await getSingle('shows', id);
    }

    this.setState(_ => ({ info }));
  }

  render() {
    const { info } = this.state;
    if (!info) {
      return null;
    }

    const imgExists = info.image && info.image.medium;

    return (
      <section class='show-detail' >
        <div class='cover-box'>
          <div class='cover' style={imgExists ? { backgroundImage: `url(${info.image.medium})` } : {}} />
          <h1>{info.name}</h1>
          <div class='img-box'>
            {imgExists && <img src={info.image.medium} width='210' height='295' alt='show cover art' />}
          </div>
          {info.genres.length > 0 && (
            <ul class='genres'>
              {info.genres.map(genre => <li>{genre}</li>)}
            </ul>
          )}
          <p>({info.runtime}min)</p>
          {info.rating.average && <h3>{info.rating.average}</h3>}
        </div>
        {info.summary && <div class='description' dangerouslySetInnerHTML={{ __html: info.summary }} />}
      </section>
    );
  }
}
