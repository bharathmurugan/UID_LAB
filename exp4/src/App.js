import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './Home';
import Products from './Products';
import Cart from './Cart';
import './styles.css'; // Import the CSS


const App = () => {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/products">Products</Link></li>
            <li><Link to="/cart">Cart</Link></li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>

        <footer>
          <p>&copy; 2024 E-Commerce Inc. All rights reserved.</p>
        </footer>
      </div>
    </Router>
  );
};

export default App;