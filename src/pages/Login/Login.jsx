import { Form, Input, message } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { isEmailPasswordValid } from '../../utils';
import { loginUser } from '../../redux/auth/authSlice';
import { useAllUsers } from '../../hooks';

const Login = () => {
  const [form] = Form.useForm();
  const allUsers = useAllUsers();
  const dispatch = useDispatch();

  const onFinish = (values) => {
    const user = isEmailPasswordValid(allUsers, values);
    if (user) {
      dispatch(loginUser(user));
    } else {
      message.error('Email and password not valid');
    }
  };

  return (
    <>
      <Form
        form={form}
        name='registrationForm'
        onFinish={onFinish}
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 18 }}
      >
        <>
          <h2 className='text-2xl mb-4'>Login and explore your account!</h2>
          <Form.Item
            label='Email'
            name='email'
            rules={[
              { required: true, message: 'Please enter your email' },
              { type: 'email', message: 'Please enter a valid email' },
            ]}
          >
            <Input prefix='@.' placeholder='Email' />
          </Form.Item>

          <Form.Item
            label='Password'
            name='password'
            rules={[
              { required: true, message: 'Please enter your password' },
              {
                min: 6,
                message: 'Password must be at least 6 characters long',
              },
            ]}
          >
            <Input.Password prefix={<UserOutlined />} placeholder='Password' />
          </Form.Item>
        </>
        <div className='flex items-center justify-center'>
          <button className='bg-black hover:bg-pink-500 text-white font-bold py-2 px-4 rounded-full w-48 mx-2'>
            Login
          </button>
        </div>
      </Form>
      <div className='text-black text-center mt-4'>
        Dont have accout?{' '}
        <Link to='/' className='text-blue-500'>
          Sign up
        </Link>
      </div>
    </>
  );
};

export default Login;
