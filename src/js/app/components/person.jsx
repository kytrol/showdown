import { h } from 'preact';
import { route } from 'preact-router';

const Person = ({ personInfo }) => {
  const { person } = personInfo;
  const { name, image, id } = person;
  return (
    <li class='jar person' onClick={_ => route(`person/${id}`)}>
      <h3>{name}</h3>
      <div class='jar-img'>
        {image && <img src={image.medium} alt={image.name} />}
      </div>
    </li>
  );
};

export default Person;
