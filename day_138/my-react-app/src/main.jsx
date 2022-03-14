import React from 'react'
import ReactDOM from 'react-dom'

const hero1 = {
  firstName: 'Иван',
  lastName: 'Царевич',
  link: 'https://ru.wikipedia.org/wiki/Иван-царевич',
};

const hero2 = {
  firstName: 'Марья',
  lastName: 'Моревна',
  link: 'https://ru.wikipedia.org/wiki/Марья_Моревна',
}

function formatName(hero) {
  return hero.firstName + '-' + hero.lastName;
}

function getGreeting(sex) {
  if (sex) {
    return <h1>Здравствуй, прекрасный <a href={hero1.link} target='_blank'>{formatName(hero1)}</a>!</h1>
  }

  return <h1>Приветствую тебя, прелестная <a href={hero2.link} target='_blank'>{formatName(hero2)}</a>!</h1>
}

const element = (
  <>{getGreeting(0)}
  <p>Как твои дела?</p></>
);

ReactDOM.render(
  element,
  document.getElementById('root')
)
