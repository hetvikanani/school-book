import { Routes, Route } from 'react-router-dom';

import { PublicLayout, PrivateLayout } from './Components';
import { Dashboard, Login, MyPosts, Profile, Register, Reminder, SavePost } from './pages';

export default function App() {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route path='/' element={<Register />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
      </Route>
      <Route path='/dashboard' element={<PrivateLayout />}>
        <Route path='' element={<Dashboard />} />
        <Route path='all-post' element={<Dashboard />} />
        <Route path='my-post' element={<MyPosts />} />
        <Route path='profile' element={<Profile />} />
        <Route path='save-post' element={<SavePost />} />
        <Route path='reminder' element={<Reminder />} />
      </Route>
    </Routes>
  );
}
