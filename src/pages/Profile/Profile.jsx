import { Form, Input, DatePicker, Button, message } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { ImageUpload } from '../../Components';
import { useDispatch } from 'react-redux';
import { updateProfile } from '../../redux/auth/authSlice';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import { useLoggedInUser } from '../../hooks';

const ProfileForm = () => {
  const [form] = Form.useForm();
  const [uploadedImage, setUploadedImage] = useState(null);
  const user = useLoggedInUser();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onFinish = (values) => {
    dispatch(
      updateProfile({
        ...user,
        ...values,
        image: uploadedImage || values.image,
        dob: dayjs(values.dob).valueOf(),
      }),
    );
    message.success('Profile updated');
    navigate('/dashboard');
  };

  return (
    <div className='flex justify-center mt-8 p-8'>
      <div className='bg-white rounded shadow p-12'>
        <Form
          form={form}
          name='profile'
          onFinish={onFinish}
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          className='w-96'
          initialValues={{ ...user, dob: dayjs(user.dob) }}
        >
          <h2 className='text-2xl mb-4'>Profile Information</h2>
          <Form.Item
            label='Full Name'
            name='name'
            rules={[{ required: true, message: 'Please enter your full name' }]}
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

          <Form.Item label='Profile Picture' name='image'>
            <ImageUpload onUpload={setUploadedImage} initalValue={user.image} />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button
              type='primary'
              className='bg-black text-white font-bold rounded-full '
              htmlType='submit'
            >
              Save Changes
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default ProfileForm;
