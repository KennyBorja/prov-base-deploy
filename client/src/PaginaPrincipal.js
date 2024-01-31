// PaginaPrincipal.js
import React from 'react';
import { Link } from 'react-router-dom';

function PaginaPrincipal() {
  return (
    <div>
      <h1>Página Principal</h1>
      <Link to="/app">
        <button>Ir a App.js</button>
      </Link>
    </div>
  );
}

export default PaginaPrincipal;
