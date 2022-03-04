import React from 'react';

class Output extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <p>{this.props.text}</p>
  }
}

export default Output;
