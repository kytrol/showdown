import { h } from 'preact';

const BackBtn = ({ onClick }) => (
  <img id='back' src='/assets/img/back.svg' alt='back' onClick={onClick} />
);

export default BackBtn;
