import React from 'react'
import ReactDOM from 'react-dom'

const hero1 = {
  firstName: 'Иван',
  lastName: 'Царевич',
};

const hero2 = {
  firstName: 'Марья',
  lastName: 'Моревна',
}

function formatName(hero) {
  return hero.firstName + '-' + hero.lastName;
}

function getGreeting(sex) {
  if (sex) {
    return <h1>Здравствуй, прекрасный {formatName(hero1)}!</h1>
  }

  return <h1>Приветствую тебя, прелестная {formatName(hero2)}!</h1>
}

const element = (
  <>{getGreeting(0)}
  <p>Как твои дела?</p></>
);

ReactDOM.render(
  element,
  document.getElementById('root')
)
