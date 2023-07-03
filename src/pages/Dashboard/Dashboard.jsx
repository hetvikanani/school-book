import { useState } from 'react';
import { Modal, Input, Button, Form } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { ImageUpload, Post } from '../../Components';
import { useDispatch } from 'react-redux';
import { createPost, updatePostInUser } from '../../redux/reducers';
import { generateUniqueId } from '../../utils';
import { useAllPosts, useLoggedInUserId } from '../../hooks';

const Dashboard = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [uploadedImage, setUploadedImage] = useState(null);
  const loggedInUserId = useLoggedInUserId();
  const posts = useAllPosts();
  const dispatch = useDispatch();

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
  };

  const handleSubmit = (values) => {
    const id = generateUniqueId();
    dispatch(
      createPost({
        description: values.description,
        title: values.title,
        id: id,
        postedUserId: loggedInUserId,
        postImage: uploadedImage,
      }),
    );
    dispatch(updatePostInUser({ id: loggedInUserId, postId: id }));
    handleModalClose();
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
      {[...posts].reverse().map((post) => (
        <Post key={post.id} post={post} />
      ))}
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
          <Form.Item label='Post Picture' name='postImage'>
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
