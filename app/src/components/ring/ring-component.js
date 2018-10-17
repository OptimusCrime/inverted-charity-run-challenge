import React from 'react';

export const RingComponent = ({ target, entries }) => (
  <div className='ring'>
    <span>{entries} / {target.toFixed(2)}</span>
  </div>
);
