import { h } from 'preact';
import { route } from 'preact-router';
import ImgBox from './img-box.jsx';

const Credit = ({ info }) => {
  const { character, show } = info;
  return (
    <div class='credit'>
      <h2>{character.name}</h2>
      <ImgBox
        image={show.image}
        alt={show.name}
        width='210'
        height='295'
        onClick={() => route(`/show/${show.id}`)}
      />
      <h3>{show.name}</h3>
    </div>
  );
};

export default Credit;
