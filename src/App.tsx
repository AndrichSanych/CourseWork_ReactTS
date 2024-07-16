import React from 'react';
import './styles.css';
import Layout from './components/layout';
import { Route, Routes } from 'react-router-dom';
import { Registration } from './components/registration/Registration';
import { Login } from './components/login/Login';

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout/>}>
            <Route path='/registration' element={<Registration/>}/>
            <Route path='/login' element={<Login/>}/>
      </Route>
    </Routes>
  );
};

export default App;
