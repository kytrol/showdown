import { h } from 'preact';

const Network = ({ network }) => (
  <div class='network'>
    <h5>{network.country.code}</h5>
    <h5>{network.name}</h5>
  </div>
);

export default Network;
