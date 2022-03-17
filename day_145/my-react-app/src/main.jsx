import React, { useState } from 'react'
import ReactDOM from 'react-dom'

function BoilingVerdict(props) {
  if (props.celsius >= 100) {
    return <p>Вода закипит.</p>;
  }

  return <p>Вода не закипит.</p>;
}

function Calculator() {
  const [ temperature, setTemperature ] = useState(0);

  function handleChange(event) {
    setTemperature(event.target.value);
  }

  return (
    <fieldset>
      <legend>Введите температуру в градусах Цельсия:</legend>
      <input type="number" value={temperature} onChange={handleChange} />
      <BoilingVerdict celsius={temperature} />
    </fieldset>
  );
}

ReactDOM.render(
  <Calculator />,
  document.getElementById('root')
)
