import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Steps, Form, Input, DatePicker, message } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { ImageUpload } from '../../Components';
import { useDispatch, useSelector } from 'react-redux';
import { isEmailExsist } from '../../utils';
import { registerUser } from '../../redux/auth/authSlice';
import moment from 'moment';
import dayjs from 'dayjs';

const { Step } = Steps;

const Register = () => {
  const [form] = Form.useForm();
  const [currentStep, setCurrentStep] = useState(0);
  const [uploadedImage, setUploadedImage] = useState(null);
  const allUsers = useSelector((store) => store.auth.allUsers);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const steps = [
    {
      title: 'Account',
      content: (
        <>
          <h2 className='text-2xl mb-4'>Create an Account</h2>
          <Form.Item
            label='Full Name'
            name='name'
            rules={[
              { required: true, message: 'Please enter your full name' },
              { min: 4, message: 'Name should be more than 3' },
            ]}
          >
            <Input prefix={<UserOutlined />} placeholder='Full Name' />
          </Form.Item>

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
      ),
    },
    {
      title: 'Profile',
      content: (
        <>
          <h2 className='text-2xl mb-4'>Complete Your Profile</h2>
          <Form.Item
            label='College'
            name='college'
            rules={[{ required: true, message: 'Please enter your college' }]}
          >
            <Input prefix={<UserOutlined />} placeholder='College' />
          </Form.Item>

          <Form.Item
            label='Date of Birth'
            name='dob'
            rules={[{ required: true, message: 'Please select your date of birth' }]}
          >
            <DatePicker className='w-full' format='YYYY-MM-DD' placeholder='Select Date' />
          </Form.Item>

          <Form.Item
            label='LinkedIn'
            name='linkedin'
            rules={[
              {
                type: 'url',
                message: 'Please enter your LinkedIn profile URL',
              },
            ]}
          >
            <Input prefix={<UserOutlined />} placeholder='LinkedIn' />
          </Form.Item>

          <Form.Item label='Mobile' name='mobile'>
            <Input prefix={<UserOutlined />} placeholder='Mobile' />
          </Form.Item>

          <Form.Item name='image' label='Profile Photo'>
            <ImageUpload onUpload={setUploadedImage} />
          </Form.Item>
        </>
      ),
    },
  ];

  const handleNext = () => {
    form.validateFields().then((values) => {
      if (isEmailExsist(values.email, allUsers)) {
        message.error('Email already register');
      } else {
        setCurrentStep(currentStep + 1);
      }
    });
  };
  const handlePrev = () => {
    setCurrentStep(currentStep - 1);
  };

  const onFinish = () => {
    message.success('Congratulation!! Now you can login with same cred!!');
    dispatch(
      registerUser({
        ...form.getFieldValue(),
        image: uploadedImage,
        dob: dayjs(form.getFieldValue('dob')).valueOf(),
      }),
    );
    navigate('/login');
  };

  return (
    <>
      <div>
        <Steps current={currentStep} className='mb-6'>
          {steps.map((step) => (
            <Step key={step.title} title={step.title} />
          ))}
        </Steps>

        <Form form={form} name='registrationForm' labelCol={{ span: 6 }} wrapperCol={{ span: 18 }}>
          {steps[currentStep].content}

          <div className='flex justify-center mt-8'>
            {currentStep > 0 && (
              <button
                onClick={handlePrev}
                className='bg-black hover:bg-pink-500 text-white font-bold py-2 px-4 rounded-full w-48 mx-2'
              >
                Previous
              </button>
            )}
            {currentStep < steps.length - 1 && (
              <button
                onClick={handleNext}
                className='bg-pink-500 hover:bg-black text-white font-bold py-2 px-4 rounded-full w-48 mx-2'
              >
                Next
              </button>
            )}
            {currentStep === steps.length - 1 && (
              <button
                onClick={onFinish}
                className='bg-black hover:bg-pink-500 text-white font-bold py-2 px-4 rounded-full w-48 mx-2'
              >
                Register
              </button>
            )}
          </div>
        </Form>
      </div>
      <div className='text-black text-center mt-4'>
        Already have an account?{' '}
        <Link to='/login' className='text-blue-500'>
          Log in
        </Link>
      </div>
    </>
  );
};

export default Register;
