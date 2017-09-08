import { h } from 'preact';
import Network from './network.jsx';

const Show = ({ showInfo }) => {
  const { show } = showInfo;
  return (
    <li class='jar show'>
      {show.network && <Network network={show.network} />}
      <h3>{show.name}</h3>
      <div class='jar-img'>
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
