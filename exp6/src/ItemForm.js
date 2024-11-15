import React, { useState } from 'react';
import './ItemForm.css'; // Import the CSS file

const ItemForm = ({ addItem }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [quantity, setQuantity] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name && description && quantity) {
      addItem({ name, description, quantity });
      setName('');
      setDescription('');
      setQuantity('');
    } else {
      alert('Please fill out all fields');
    }
  };

  return (
    <div className="form-container">
      <form className="item-form" onSubmit={handleSubmit}>
        <h2>Add New Item</h2>
        <div className="form-group">
          <label htmlFor="name">Item Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter item name"
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter item description"
          />
        </div>
        <div className="form-group">
          <label htmlFor="quantity">Quantity:</label>
          <input
            type="number"
            id="quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            placeholder="Enter item quantity"
          />
        </div>
        <button type="submit">Add Item</button>
      </form>
    </div>
  );
};

export default ItemForm;