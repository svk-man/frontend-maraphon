import React from 'react';
import Form from './Form';
import Output from './Output';

class GenderizeApp extends React.Component {
  constructor(props) {
    super(props);

    this.state = {outputText: ''};
    this.updateOutputText = this.updateOutputText.bind(this);
  }

  updateOutputText(nameInfo) {
    this.setState({
      outputText: (nameInfo['gender'] ? 'Gender: ' + nameInfo['gender'] : '')
    });
  }

  render() {
    return (
      <div>
        <Form updateOutputText={this.updateOutputText} />
        <Output text={this.state.outputText} />
      </div>
    );
  }
}

export default GenderizeApp
