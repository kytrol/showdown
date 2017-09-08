import { h } from 'preact';
import Person from './person.jsx';

const PersonList = ({ people }) => (
  <ul class='person-list'>
    {people.map(person => <Person personInfo={person} />)}
  </ul>
);

export default PersonList;
