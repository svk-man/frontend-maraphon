import React, { useEffect, useState } from 'react'
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

function Clock() {
  const [date, setDate] = useState(new Date());
  let timerId = null;
  useEffect(() => {
    timerId = setInterval(() => setDate(new Date()), 1000);

    return () => {  clearInterval(timerId) };
  });
  return <p>Время сейчас такое: {formatDate(date)}</p>;
}

function formatDate(date) {
  return date.toLocaleTimeString();
}

function Comment(props) {
  return (
    <div>
      <UserInfo user={props.author} />
      <div>
        {props.text}
      </div>
      <div>
        {formatDate(props.date)}
      </div>
    </div>
  );
}

function Avatar(props) {
  return (
    <img
      src={props.user.avatarUrl}
      alt={props.user.name}/>
  );
}

function UserInfo(props) {
  return (
    <div>
      <Avatar user={props.user} />
      <div>
        {props.user.name}
      </div>
    </div>
  );
}

const comment = {
  'author': {
    'name': 'Kitty',
    'avatarUrl': 'http://placekitten.com/g/64/64',
  },
  'text': 'Very cool app!',
  'date': new Date(),
}

const numbers = [1, 2, 3, 4, 5];

function NumberList(props) {
  const numbers = props.numbers;
  const listItems = numbers.map((number) =>
    <li key={number.toString()}>
      {number}
    </li>
  );

  return <ul>{listItems}</ul>;
}

function App() {
  return (
    <div>
      <Greeting sex="1" />
      <Greeting sex="0" />
      <Clock />
      <Comment
        author={comment.author}
        text={comment.text}
        date={comment.date} />
      <NumberList numbers={numbers} />
    </div>
  );
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
