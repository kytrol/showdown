import { h } from 'preact';

const Person = ({ personInfo }) => {
  const { person } = personInfo;
  const { name, image } = person;
  return (
    <li class='jar person'>
      <h3>{name}</h3>
      <div class='jar-img'>
        {image && <img src={image.medium} alt={image.name} />}
      </div>
    </li>
  );
};

export default Person;
