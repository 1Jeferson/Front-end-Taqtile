import { Navigate, Route, Routes } from 'react-router-dom';
import Login from '../pages/login';
import { AuthRoute } from './auth';
import UserList from '../pages/user-list';

export const AppRoutes = () => {
  const token = localStorage.getItem('authToken');

  return (
    <Routes>
      <Route path='/' element={token ? <Navigate to='/user-list' /> : <Login />} />

      <Route element={<AuthRoute />}>
        <Route path='/user-list' element={<UserList />} />
      </Route>
    </Routes>
  );
};
