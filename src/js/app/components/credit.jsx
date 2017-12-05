import { h } from 'preact';
import ImgBox from './img-box.jsx';

const Credit = ({ info }) => {
  const { character, show } = info;
  return (
    <div class='credit'>
      <h2>{show.name}</h2>
      <ImgBox
        image={show.image}
        alt={show.name}
        width='210'
        height='295'
      />
      <h3>{character.name}</h3>
    </div>
  );
};

export default Credit;
