import { h } from 'preact';
import ShowCast from './show-cast.jsx';

const ShowDetail = ({ info }) => (
  <div>
    {info.summary && (
      <div
        class='description'
        dangerouslySetInnerHTML={{ __html: info.summary }}
      />
    )}
    <ShowCast id={info.id} />
  </div>
);

export default ShowDetail;
