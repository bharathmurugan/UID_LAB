import React, { useState } from 'react';
import ItemForm from './ItemForm';

const App = () => {
  const [items, setItems] = useState([]);

  const addItem = (item) => {
    setItems([...items, item]);
  };

  return (
    <div>
      <ItemForm addItem={addItem} />
      <ul>
        {items.map((item, index) => (
          <li key={index}>
            {item.name} - {item.description} (Quantity: {item.quantity})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;