import { h } from 'preact';

const CoverBox = ({ info }) => {
  const { image, name, genres, runtime, rating } = info;
  const imgExists = image && image.medium;

  return (
    <div class='cover-box'>
      <div
        class='cover'
        style={imgExists
          ? { backgroundImage: `url(${image.medium})` }
          : {}}
      />
      <h1>{name}</h1>
      <div class='img-box'>
        {imgExists && (
          <img
            src={image.medium}
            width='210'
            height='295'
            alt={name}
          />
        )}
      </div>
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
