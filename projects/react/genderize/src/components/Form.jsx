import React from 'react';
import Button from "./Button";
import Input from "./Input";

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.updateOutputText = props.updateOutputText;

    this.URL = 'https://api.genderize.io?name=';
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();

    const form = e.target;
    const name = form.elements['name'].value;
    const isValidName = name.trim() !== '';
    if (isValidName) {
      this.fetchNameInfo(name);
    } else {
      this.updateOutputText({'gender': ''});
    }

    form.reset();
  }

  fetchNameInfo(name) {
    fetch(this.URL + name)
      .then(response => response.json())
      .then(this.updateOutputText);
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <Input name="name" />
        <Button />
      </form>
    );
  }
}

export default Form;
