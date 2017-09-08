import { h } from 'preact';
import Show from './show.jsx';

const ShowList = ({ shows }) => (
  <ul class='show-list'>
    {shows.map(show => <Show showInfo={show} />)}
  </ul>
);

export default ShowList;
