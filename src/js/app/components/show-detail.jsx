import { h } from 'preact';

const ShowDetail = ({ info }) => (
  info.summary && (
    <div
      class='description'
      dangerouslySetInnerHTML={{ __html: info.summary }}
    />
  )
);

export default ShowDetail;
