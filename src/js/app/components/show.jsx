import { h } from 'preact';

const Show = (show) => (
  <li class='show'>
    <h3>{show.name}</h3>
    {show.image && <img src={show.image.medium} />}
    <p dangerouslySetInnerHTML={{ __html: show.summary }} />
  </li>
);

export default Show;
