import React, { useState } from 'react';

function Input(props) {
  const [isNotValidValue, setIsNotValidValue] = useState(false);

  handleChange = handleChange.bind(this);

  function handleChange(event) {
    const input = event.target;
    const inputValue = input.value;
    setIsNotValidValue(inputValue !== '' && inputValue.trim().length <= 2);
  }

  return (
    <div>
      <input type="text" placeholder="Name..." name={props.name} onChange={handleChange} />
      {isNotValidValue && <span>Error: Name length is too short</span>}
    </div>
  );
}

export default Input;
