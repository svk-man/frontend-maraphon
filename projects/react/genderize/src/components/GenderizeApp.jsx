import React from 'react';
import Form from './Form';
import Output from './Output';
import { useState } from 'react';

function GenderizeApp() {
  const [outputText, setOutpuText] = useState('');
  updateOutputText = updateOutputText.bind(this);

  function updateOutputText(nameInfo) {
    setOutpuText(nameInfo['gender'] ? 'Gender: ' + nameInfo['gender'] : '');
  }

  return (
    <div>
      <Form updateOutputText={updateOutputText} />
      <Output text={outputText} />
    </div>
  );
}

export default GenderizeApp
