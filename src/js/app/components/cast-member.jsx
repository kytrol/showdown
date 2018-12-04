import { h } from 'preact';
import { route } from 'preact-router';
import ImgBox from './img-box.jsx';

const CastMember = ({ info }) => {
  const { character, person } = info;
  return (
    <div class='credit'>
      <h2>{person.name}</h2>
      <ImgBox
        image={person.image}
        alt={person.name}
        width='210'
        height='295'
        onClick={() => route(`/person/${person.id}`)}
      />
      <h3>{character.name}</h3>
    </div>
  );
};

export default CastMember;
