import React from 'react';
import './styles.css';
import Layout from './components/layout';
import { Route, Routes } from 'react-router-dom';
import { Registration } from './components/registration/Registration';
import { Login } from './components/login/Login';
import Error from './components/Error/Error'


const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout/>}>
            <Route path='/registration' element={<Registration/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path="*" element={
            <Error
              status="404"
              title="404"
              subTitle="Вибачте, сторінкт на яку ви намагаєтесь перейти не існує."
            />} />
      </Route>
    </Routes>
  );
};

export default App;
