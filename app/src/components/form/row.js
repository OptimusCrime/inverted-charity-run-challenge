import React from 'react';

export const FormRow = ({ label, input, inputClass = '' }) => (
  <div className='form-container__row'>
    <div className='form-container__label'>
      {label}
    </div>
    <div className={`form-container__input ${inputClass}`}>
      {input}
    </div>
  </div>
);