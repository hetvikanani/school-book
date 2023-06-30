import { useState } from 'react';
import { Modal, Input, Button, Form } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { ImageUpload, Post } from '../../Components';

const Dashboard = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [uploadedImage, setUploadedImage] = useState(null);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
  };

  const handleFormSubmit = (values) => {
    // Handle form submission logic here
    console.log(values);
    // Close the modal
    handleModalClose();
  };

  const handleSubmit = (values) => {
    handleFormSubmit(values);
  };

  return (
    <div className='flex flex-col items-center'>
      <div className='mb-4 z-10 mt-4'>
        <Button
          type='primary'
          shape='round'
          className='flex items-center justify-center p-6 font-bold'
          onClick={showModal}
        >
          <PlusOutlined className='mr-1' />
          Create Post
        </Button>
      </div>
      <Post />
      <Post />
      <Post />
      <Post />
      <Modal
        title='Create Post'
        open={isModalVisible}
        centered
        onCancel={handleModalClose}
        footer={null}
      >
        <Form onFinish={handleSubmit}>
          <Form.Item name='title' rules={[{ required: true, message: 'Please enter the title' }]}>
            <Input placeholder='Enter title' />
          </Form.Item>
          <Form.Item
            name='description'
            rules={[{ required: true, message: 'Please enter the description' }]}
          >
            <Input.TextArea placeholder='Enter description' rows={4} />
          </Form.Item>
          <Form.Item label='Post Picture' name='profile'>
            <ImageUpload onUpload={setUploadedImage} />
          </Form.Item>
          <div>
            <Button type='default' htmlType='submit'>
              Submit
            </Button>
          </div>
        </Form>
      </Modal>
    </div>
  );
};

export default Dashboard;
