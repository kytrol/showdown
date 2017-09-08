import { h } from 'preact';
import Show from '../components/show.jsx';

const ShowList = ({ shows }) => (
  <ul class='show-list'>
    {shows.map(show => <Show showInfo={show} />)}
  </ul>
);

export default ShowList;
