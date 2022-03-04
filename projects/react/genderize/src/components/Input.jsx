import React from 'react';

class Input extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <input type="text" placeholder="Name..." name={this.props.name} />
  }
}

export default Input;
