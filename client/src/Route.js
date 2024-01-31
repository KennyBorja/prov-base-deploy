// Route.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PaginaPrincipal from './PaginaPrincipal';
import App from './App';

function Rutas() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PaginaPrincipal />} />
        <Route path="/app" element={<App />} />
      </Routes>
    </Router>
  );
}

export default Rutas;
