import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'

function Counter() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    document.title = `Вы кликнули ${count} раз`;
  });

  return (
    <div>
      <p>Вы кликнули {count} раз</p>
      <button onClick={() => { setCount(count + 1); }}>Кликнуть</button>
    </div>
  );
}

ReactDOM.render(
  <Counter />,
  document.getElementById('root')
)
