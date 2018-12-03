import { h } from 'preact';
import Show from './show.jsx';

const ShowList = ({ shows }) => (
  <div>
    {shows.length ? <h1>Shows</h1> : <h3>No shows found.</h3>}
    <ul class='show-list'>
      {shows.map(show => <Show showInfo={show} />)}
    </ul>
  </div>
);

export default ShowList;
