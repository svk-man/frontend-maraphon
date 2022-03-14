import React from 'react'
import ReactDOM from 'react-dom'

const name = 'Иван-царевич';
const element = <h1>Здравствуй, {name}!</h1>

ReactDOM.render(
  element,
  document.getElementById('root')
)
