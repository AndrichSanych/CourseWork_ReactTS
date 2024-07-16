import React from 'react';
import './styles.css';
import Layout from './components/layout';
import { Route, Routes } from 'react-router-dom';
import { Registration } from './components/Registration/Registration';

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout/>}>
            <Route index element={<Registration/>}/>
      </Route>
    </Routes>
  );
};

export default App;
