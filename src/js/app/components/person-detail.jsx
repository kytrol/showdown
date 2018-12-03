import { h } from 'preact';
import CastCredits from './cast-credits.jsx';

const PersonDetail = ({ info, onCreditClick }) => {
  console.log('passing info to castCredits', info);
  return <CastCredits id={info.id} onCreditClick={onCreditClick} />;
};

export default PersonDetail;
