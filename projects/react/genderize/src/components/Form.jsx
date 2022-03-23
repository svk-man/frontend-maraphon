import React, { useState } from 'react';
import Button from "./Button";
import Input from "./Input";
import "./Form.css";

function Form(props) {
  const [name, setName] = useState('');
  const [isNotValidName, setIsNotValidName] = useState(false);
  const updateOutputText = props.updateOutputText;
  const URL = 'https://api.genderize.io?name=';

  function handleChange(event) {
    const name = event.target.value;
    const isNotValidName = name !== '' && name.trim().length <= 2;

    setName(name);
    setIsNotValidName(isNotValidName);
  }

  function handleSubmit(event) {
    showOutputText(name);
    event.preventDefault();
  }

  async function showOutputText(name) {
    const isValidName = name.trim() !== '';
    let gender = '';
    if (isValidName) {
      const nameData = await getNameData(name);
      gender = nameData['gender'];
    }

    updateOutputText({'gender': gender});
  }

  async function getNameData(name) {
    try {
      const getUrl = () => { return URL + name; };
      const data = await fetch(getUrl());
      const json = await data.json();
      return json;
    } catch(error) { }
  }

  return (
    <form onSubmit={handleSubmit} className="form">
      <Input type="text" placeholder="Name..." value={name} onChange={handleChange} />
      {isNotValidName && <span>Error: Name length is too short</span>}
      <Button type="submit" value="Search name" />
    </form>
  );
}

export default Form;
