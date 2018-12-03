import { h } from 'preact';
import ShowCast from './show-cast.jsx';

const ShowDetail = ({ info, onMemberClick }) => (
  <div>
    {info.summary && (
      <div
        class='description'
        dangerouslySetInnerHTML={{ __html: info.summary }}
      />
    )}
    <ShowCast id={info.id} onMemberClick={onMemberClick} />
  </div>
);

export default ShowDetail;
