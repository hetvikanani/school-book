import { Routes, Route } from 'react-router-dom';

import ProtectedLayout from './ProtectedRoute';
import { Layout, Login, Register } from './Components';

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path='/' element={<Register />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
      </Route>

      <Route path='/dashboard' element={<ProtectedLayout />}>
        <Route path='profile' element={<div>Dashboard</div>} />
        <Route path='settings' element={<div>Dashboard</div>} />
      </Route>
    </Routes>
  );
}
