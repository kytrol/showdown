import { h } from 'preact';
import { route } from 'preact-router';
import BackBtn from './back-btn.jsx';
import ImgBox from './img-box.jsx';

const CoverBox = ({ info, detailType }) => {
  const { image, name, genres, runtime, rating } = info;
  const imgExists = detailType !== 'person' && image && image.medium;

  return (
    <div class='cover-box'>
      <BackBtn onClick={() => route(`/${detailType}`, true)} />
      <div
        class='cover'
        style={imgExists
          ? { backgroundImage: `url(${image.medium})` }
          : {}}
      />
      <h1>{name}</h1>
      <ImgBox
        image={image}
        alt={name}
        width='210'
        height='295'
      />
      {(genres && genres.length > 0) && (
        <ul class='genres'>
          {genres.map(genre => <li>{genre}</li>)}
        </ul>
      )}
      {runtime && <p>({runtime}min)</p>}
      {(rating && rating.average) && (
        <h3>{rating.average}</h3>
      )}
    </div>
  );
};

export default CoverBox;
