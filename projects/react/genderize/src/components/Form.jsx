import React from 'react';
import Button from "./Button";
import Input from "./Input";

function Form(props) {
  const updateOutputText = props.updateOutputText;
  const URL = 'https://api.genderize.io?name=';

  function handleSubmit(event) {
    event.preventDefault();

    const form = event.target;
    const name = form.elements['name'].value;
    showOutputText(name);
    form.reset();
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
    } catch(error) {
      
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <Input />
      <Button />
    </form>
  );
}

export default Form;
