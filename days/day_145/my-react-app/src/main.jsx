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

function toCelsius(fahrenheit) {
  return (fahrenheit - 32) * 5 / 9;
}

function toFahrenheit(celsius) {
  return (celsius * 9 / 5) + 32;
}

function tryConvert(temperature, convert) {
  const input = parseFloat(temperature);
  if (Number.isNaN(input)) {
    return '';
  }

  const output = convert(input);
  const rounded = Math.round(output * 1000) / 1000;
  return rounded.toString();
}

function TemperatureInput(props) {
  const temperature = props.temperature;
  const scale = props.scale;

  function handleChange(event) {
    props.onTemperatureChange(event.target.value);
  }

  return (
    <fieldset>
      <legend>Введите температуру в градусах {scaleNames[scale]}:</legend>
      <input type="number" value={temperature} onChange={handleChange} />
    </fieldset>
  );
}

function Calculator() {
  const [ temperature, setTemperature ] = useState('0');
  const [ scale, setScale ] = useState('c');

  function handleCelsiusChange(temperature) {
    setScale('c');
    setTemperature(temperature);
  }

  function handleFahrenheitChange(temperature) {
    setScale('f');
    setTemperature(temperature);
  }

  const celsius = scale === 'f' ? tryConvert(temperature, toCelsius) : temperature;
  const fahrenheit = scale === 'c' ? tryConvert(temperature, toFahrenheit) : temperature;

  return (
    <div>
      <TemperatureInput
        scale="c"
        temperature={celsius}
        onTemperatureChange={handleCelsiusChange} />
      <TemperatureInput
        scale="f"
        temperature={fahrenheit}
        onTemperatureChange={handleFahrenheitChange} />
      <BoilingVerdict
        celsius={parseFloat(celsius)} />
    </div>
  );
}

ReactDOM.render(
  <Calculator />,
  document.getElementById('root')
)
