import React, { useState } from 'react'
import ReactDOM from 'react-dom'

function BoilingVerdict(props) {
  if (props.celsius >= 100) {
    return <p>Вода закипит.</p>;
  }

  return <p>Вода не закипит.</p>;
}

const scaleNames = {
  c: 'Цельсия',
  f: 'Фаренгейта'
};

function TemperatureInput(props) {
  const [ temperature, setTemperature ] = useState(0);
  const scale = props.scale;

  function handleChange(event) {
    setTemperature(event.target.value);
  }

  return (
    <fieldset>
      <legend>Введите температуру в градусах {scaleNames[scale]}:</legend>
      <input type="number" value={temperature} onChange={handleChange} />
    </fieldset>
  );
}

function Calculator() {
  return (
    <div>
      <TemperatureInput scale="c" />
      <TemperatureInput scale="f" />
    </div>
  );
}

ReactDOM.render(
  <Calculator />,
  document.getElementById('root')
)
