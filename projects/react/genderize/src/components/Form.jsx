import React from 'react';
import Button from "./Button";
import Input from "./Input";

class Form extends React.Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    console.log('Form is send.');
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <Input />
        <Button />
      </form>
    );
  }
}

export default Form;
