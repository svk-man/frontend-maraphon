import React from 'react';
import Button from "./Button";
import Input from "./Input";

function Form(props) {
  const updateOutputText = props.updateOutputText;
  const URL = 'https://api.genderize.io?name=';
  handleSubmit = handleSubmit.bind(this);

  function handleSubmit(event) {
    event.preventDefault();

    const form = event.target;
    const name = form.elements['name'].value;
    const isValidName = name.trim() !== '';
    if (isValidName) {
      fetchNameInfo(name);
    } else {
      updateOutputText({'gender': ''});
    }

    form.reset();
  }

  function fetchNameInfo(name) {
    fetch(URL + name)
      .then(response => response.json())
      .then(updateOutputText);
  }

  return (
    <form onSubmit={handleSubmit}>
      <Input name="name" />
      <Button />
    </form>
  );
}

export default Form;
