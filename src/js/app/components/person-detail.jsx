import { h } from 'preact';
import CastCredits from './cast-credits.jsx';

const PersonDetail = ({ info, onCreditClick }) => {
  return <CastCredits id={info.id} onCreditClick={onCreditClick} />;
};

export default PersonDetail;
