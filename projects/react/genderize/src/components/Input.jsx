import React, { useState } from 'react';

function Input() {
  const [isNotValidValue, setIsNotValidValue] = useState(false);

  function handleChange(event) {
    const value = event.target.value;
    const isNotValidValue = value !== '' && value.trim().length <= 2;
    setIsNotValidValue(isNotValidValue);
  }

  return (
    <div>
      <input type="text" placeholder="Name..." name="name" onChange={handleChange} />
      {isNotValidValue && <span>Error: Name length is too short</span>}
    </div>
  );
}

export default Input;
