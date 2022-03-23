import React from 'react';
import Form from './Form';
import Output from './Output';
import { useState } from 'react';

function GenderizeApp() {
  const [outputText, setOutpuText] = useState('');

  function updateOutputText(nameData) {
    setOutpuText(nameData['gender'] ? 'Gender: ' + nameData['gender'] : '');
  }

  return (
    <div>
      <Form updateOutputText={updateOutputText} />
      <Output text={outputText} />
    </div>
  );
}

export default GenderizeApp;
