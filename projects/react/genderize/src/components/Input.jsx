import React from 'react';

function Input(props) {
  const { type, placeholder, name, onChange } = props;

  return (
    <input type={type} placeholder={placeholder} onChange={onChange} />
  );
}

export default Input;
