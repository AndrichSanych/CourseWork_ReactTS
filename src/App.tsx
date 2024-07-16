import React from 'react';
import './styles.css';
import Layout from './components/layout';
import { Route, Routes } from 'react-router-dom';
import { Registration } from './components/registration/Registration';

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout/>}>
            <Route path='/registration' element={<Registration/>}/>
      </Route>
    </Routes>
  );
};

export default App;
