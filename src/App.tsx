import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Registration } from '../src/components/user/registration/Registration';
import { Login } from './components/user/login/Login';
import Error from './components/Error/Error'
import HomePage from './components/home-page/HomePage';
import UserProtectedRoute from './components/protected-routes/UserProtectedRoute';
import FavoriteAdverts from './components/user/favorite-adverts/FavoriteAdverts';
import UserAccount from './components/user/user-account/UserAccount';
import UserAdverts from './components/user/user-adverts/UserAdverts';
import Layout from './components/Layout';
import CreateAdvert from './components/advert/create-advert';


const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="/create-advert" element={
          <UserProtectedRoute children={<CreateAdvert />} />
        } />
        <Route path="/favorites" element={
          <UserProtectedRoute children={<FavoriteAdverts />} />
        } />
         <Route path="/account" element={
          <UserProtectedRoute children={<UserAccount />} />
        } />
        <Route path="/useradverts" element={
          <UserProtectedRoute children={<UserAdverts />} />
        } />
        <Route path='/registration' element={<Registration />} />
        <Route path='/login' element={<Login />} />
        <Route path="*" element={
          <Error
            status="404"
            title="404"
            subTitle="Вибачте, сторінкт на яку ви намагаєтесь перейти не існує."
          />} />
          <Route path="forbiden" element={
            <Error
              status="403"
              title="403"
              subTitle="В доступі відмовлено.Ви не маєте дозволу для доступу до цієї сторінки."
            />} />
      </Route>
    </Routes>
  );
};

export default App;
