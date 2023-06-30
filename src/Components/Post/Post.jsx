import { useState } from 'react';
import { Avatar, Button, Card, Input, List, Tooltip } from 'antd';
import {
  HeartOutlined,
  HeartFilled,
  MessageOutlined,
  RetweetOutlined,
  SendOutlined,
  StarFilled,
  DeleteOutlined,
  EditOutlined,
} from '@ant-design/icons';

import styles from './post.module.css';

const Post = () => {
  const [liked, setLiked] = useState(false);
  const [isPostSaved, setIsPostSaved] = useState(false);

  const [showComments, setShowComments] = useState(false);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);

  const handleLike = () => {
    setLiked(!liked);
  };
  const isUserOwnsPost = true;
  const handleComment = () => {
    setShowComments(!showComments);
  };

  const handleCommentSubmit = () => {
    // Add the comment to the comments list
    setComments([...comments, comment]);
    // Clear the comment input
    setComment('');
  };

  const isSendButtonDisabled = comment.trim() === '';

  return (
    <div className='flex items-center justify-center mb-8'>
      <Card className={`bg-white border shadow-sm p-4 ${styles['md:w-96']}`}>
        <div className={`${styles['save-post-container']} absolute top-4 right-4`}>
          <Tooltip title='Save Post'>
            <StarFilled
              className={`text-gray-500 cursor-pointer ${isPostSaved ? 'text-yellow-500' : ''}`}
              onClick={() => setIsPostSaved(!isPostSaved)}
            />
          </Tooltip>
        </div>
        <div className='flex items-center mb-4'>
          <Avatar size={32} src='user-avatar.png' className='mr-2' />
          <span className='text-sm font-medium'>John Doe</span>
        </div>
        <div className={`${styles['post-image-container']} mb-4`}>
          <img
            src='/do-some.jpg'
            alt='Post'
            className={`${styles['post-image']} w-full max-w-full`}
          />
        </div>
        <h3 className='text-xl font-semibold mb-1 mt-4'>Post Title</h3>
        <p className='text-gray-600 mb-2 hidden md:block'>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </p>
        <div className='flex items-center text-gray-500 mb-4'>
          <span className='mr-2'>June 28, 2023</span>
          <span className='mr-2'>10:00 AM</span>
        </div>
        <div className='flex items-center justify-between'>
          <Button
            type='text'
            icon={liked ? <HeartFilled /> : <HeartOutlined />}
            className={`text-gray-500 flex items-center ${liked ? 'text-pink-500' : ''}`}
            onClick={handleLike}
          >
            {liked ? 'Liked' : 'Like'} (10)
          </Button>
          <Button
            type='text'
            icon={<MessageOutlined />}
            className='text-gray-500 flex items-center'
            onClick={handleComment}
          >
            Comment
          </Button>
          <Button
            type='text'
            icon={<RetweetOutlined />}
            className='text-gray-500 flex items-center'
          >
            Repost
          </Button>
        </div>
        {showComments && (
          <div className='mt-4'>
            <List
              dataSource={comments}
              renderItem={(item) => (
                <List.Item>
                  <List.Item.Meta
                    avatar={<Avatar src='commenter-avatar.png' />}
                    title='Commenter Name'
                    description={item}
                  />
                  <div>Comment Time</div>
                </List.Item>
              )}
            />
            <div className='flex mt-4'>
              <div className='flex items-center mr-2'>
                <Avatar size={24} src='login-user-avatar.png' />
              </div>
              <Input
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder='Write a comment...'
                className='mr-2'
              />
              <Button
                type='primary'
                shape='circle'
                icon={<SendOutlined />}
                onClick={handleCommentSubmit}
                disabled={isSendButtonDisabled}
                className='bg-blue-500 flex items-center justify-center'
              />
            </div>
          </div>
        )}
        {isUserOwnsPost && (
          <div className='flex justify-between mt-4'>
            <Button danger className='flex items-center justify-center'>
              <DeleteOutlined className='w-4 h-4 mr-1' />
              Delete
            </Button>
            <Button type='primary' className='flex items-center justify-center'>
              <EditOutlined className='w-4 h-4 mr-1' />
              Edit
            </Button>
          </div>
        )}
      </Card>
    </div>
  );
};

export default Post;
