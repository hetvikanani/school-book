// Import the needed dependencies
import { useState, useEffect } from 'react';
import { Avatar, Layout, Menu } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, Outlet, useLocation, useNavigate } from 'react-router-dom';
import {
  AppstoreOutlined,
  BarChartOutlined,
  TeamOutlined,
  UploadOutlined,
  VideoCameraOutlined,
  LogoutOutlined,
} from '@ant-design/icons';
import { logoutUser } from '../../../redux/auth/authSlice';
import { getAvatarText, getUserById } from '../../../utils';
import MyAvatar from '../../MyAvatar/MyAvatar';

const { Content, Sider } = Layout;

const options = [
  { key: 'all-post', icon: <TeamOutlined />, label: 'Dashboard' },
  { key: 'my-post', icon: <VideoCameraOutlined />, label: 'My posts' },
  { key: 'save-post', icon: <UploadOutlined />, label: 'Saved Post' },
  { key: 'profile', icon: <BarChartOutlined />, label: 'Profile' },
  { key: 'reminder', icon: <AppstoreOutlined />, label: 'Reminder' },
  { key: 'logout', icon: <LogoutOutlined />, label: 'Logout' },
];

const items = options.map((item) => ({
  ...item,
  label: item.label,
}));

const App = () => {
  const { isLoggedIn, user } = useSelector((state) => ({
    isLoggedIn: state.auth.isLoggedIn,
    user: getUserById(state.auth.allUsers, state.auth.loggedInUserId),
  }));
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [collapsed, setCollapsed] = useState(false);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  useEffect(() => {
    // Collapse the Sider on mobile view
    const handleWindowResize = () => {
      if (window.innerWidth <= 576) {
        setCollapsed(true);
      } else {
        setCollapsed(false);
      }
    };

    handleWindowResize();

    window.addEventListener('resize', handleWindowResize);
    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, []);

  if (!isLoggedIn) {
    // user is not authenticated
    return <Navigate to='/' />;
  }

  const activeKeys =
    location.pathname === '/dashboard' ? 'all-post' : location.pathname.split('/')[2];

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={toggleCollapsed}
        style={{
          overflow: 'auto',
          height: '100vh',
          position: 'fixed',
          left: 0,
          top: 0,
          bottom: 0,
        }}
      >
        <div className='demo-logo-vertical' />
        <div className='flex items-center justify-start h-16 m-4 bg-inherit text-white font-bold'>
          <MyAvatar user={user} />
          <span className='text-lg font-bold'>{user?.name}</span>
        </div>
        <Menu
          theme='dark'
          mode='inline'
          defaultSelectedKeys={['4']}
          selectedKeys={activeKeys}
          items={items}
          onClick={(data) => {
            if (data.key === 'logout') {
              dispatch(logoutUser());
            } else navigate(data.key);
          }}
        />
      </Sider>
      <Layout className='site-layout' style={{ marginLeft: collapsed ? 80 : 200 }}>
        <Content
          style={{
            margin: '24px 16px 0',
            overflow: 'initial',
            paddingTop: 64,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default App;
