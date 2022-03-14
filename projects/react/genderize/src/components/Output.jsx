import React from 'react';

function Output(props) {
  if (!props.text) {
    return null;
  }

  return <p>{props.text}</p>
}

export default Output;
