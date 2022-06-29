import { h } from 'preact';
import CastCredits from './cast-credits.jsx';

const PersonDetail = ({ info }) => {
  return <CastCredits id={info.id} />;
};

export default PersonDetail;
