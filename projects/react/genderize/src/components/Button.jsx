import React from 'react';

function Button(props) {
  const { type, value } = props;
  return <input type={type} value={value} />;
}

export default Button;
