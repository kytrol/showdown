import { h } from 'preact';
import Person from './person.jsx';

const PersonList = ({ people }) => (
  <div>
    {people.length ? <h1>Actors</h1> : <h3>No actors found.</h3>}
    <ul class='person-list'>
      {people.map(person => <Person personInfo={person} />)}
    </ul>
  </div>

);

export default PersonList;
