import { h } from 'preact';

const Show = ({ showInfo }) => {
  const { show } = showInfo;
  return (
    <li class='jar show'>
      <div class='network'>
        {show.network && <h5>{show.network.country.code}</h5>}
        {show.network && <h5>{show.network.name}</h5>}
      </div>
      <h3>{show.name}</h3>
      <div class='show-img'>
        {show.image && <img src={show.image.medium} alt={show.image.name}/>}
      </div>
      {show.genres && (
        <ul class='genres'>
          {show.genres.filter((g, i) => i < 2).map(g => <li>{g}</li>)}
        </ul>
      )}
    </li>
  );
};

export default Show;
