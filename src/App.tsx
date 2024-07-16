import React from 'react';
import './styles.css';
import Layout from './components/layout';
import { Route, Routes } from 'react-router-dom';

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
                
      </Route>
    </Routes>
  );
};

export default App;
