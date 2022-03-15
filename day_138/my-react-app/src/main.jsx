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

function Greeting(props) {
  const sex = props.sex;
  if (sex) {
    return <h1>Здравствуй, прекрасный <a href={hero1.link} target='_blank'>{formatName(hero1)}</a>!</h1>;
  }

  return <h1>Приветствую тебя, прелестная <a href={hero2.link} target='_blank'>{formatName(hero2)}</a>!</h1>;
}

function formatName(hero) {
  return hero.firstName + '-' + hero.lastName;
}

function Time() {
  return <p>Время сейчас такое: {getCurrentTime()}</p>;
}

function getCurrentTime() {
  return new Date().toLocaleTimeString();
}

function App() {
  return (
    <div>
      <Greeting sex="1" />
      <Greeting sex="0" />
      <Time />
    </div>
  );
}

function update() {
  ReactDOM.render(
    <App />,
    document.getElementById('root')
  )
}

setInterval(update, 1000);
