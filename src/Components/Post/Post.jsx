/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState } from 'react';
import { Avatar, Button, Card, Input, List, Tooltip, message } from 'antd';
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
import { useDispatch, useSelector } from 'react-redux';

import { formatTimeAgo, generateUniqueId, getUserById, populateComment } from '../../utils';
import MyAvatar from '../MyAvatar/MyAvatar';

import styles from './post.module.css';
import { createComment } from '../../redux/comments/commentsSlice';
import { likePost, updatePostComment } from '../../redux/post/postSlice';
import { updateLikedPostInUser, updateSavedPostInUser } from '../../redux/reducers';

const Post = ({
  post: { likes, commentIds, isRepost, createdAt, id, title, description, postedUserId, postImage },
}) => {
  const { user, loggedInUserId, allComments, loggedInUser } = useSelector((store) => ({
    user: getUserById(store.auth.allUsers, postedUserId),
    loggedInUserId: store.auth.loggedInUserId,
    allComments: populateComment(store.comment.allComments, commentIds, store.auth.allUsers),
    loggedInUser: getUserById(store.auth.allUsers, store.auth.loggedInUserId),
  }));

  const dispatch = useDispatch();
  const isCurrentUserSameAsPoster = loggedInUserId === user.id;
  const isPostSaved =
    loggedInUser?.savedPost?.filter((savedPostId) => savedPostId === id).length > 0;
  const isPostLiked =
    loggedInUser?.likedPost?.filter((likedPostId) => likedPostId === id).length > 0;
  const [showComments, setShowComments] = useState(false);
  const [comment, setComment] = useState('');

  const handleLike = () => {
    dispatch(updateLikedPostInUser({ id: loggedInUserId, postId: id }));
    dispatch(likePost({ postId: id, likes: isPostLiked ? likes - 1 : likes + 1 }));
  };
  const handleComment = () => {
    setShowComments(!showComments);
  };

  const handleCommentSubmit = () => {
    const commentId = generateUniqueId();
    dispatch(createComment({ id: commentId, title: comment, userId: loggedInUserId, postId: id }));
    dispatch(updatePostComment({ commentId, postId: id }));
    setComment('');
  };

  const isSendButtonDisabled = comment.trim() === '';

  return (
    <div className='flex items-center justify-center mb-8'>
      <Card className={`bg-white border shadow-sm p-4 ${styles['md:w-96']}`}>
        <div
          className={`${styles['save-post-container']} absolute top-4 right-4 ${
            isCurrentUserSameAsPoster ? 'hidden' : ''
          }`}
        >
          <Tooltip title='Save Post'>
            <StarFilled
              className={`text-gray-500 cursor-pointer ${isPostSaved ? 'text-yellow-500' : ''}`}
              onClick={() => {
                dispatch(updateSavedPostInUser({ id: loggedInUserId, postId: id }));
                message.success(`Post ${isPostSaved ? 'removed' : 'saved'} successfully!!`);
              }}
            />
          </Tooltip>
        </div>
        <div className='flex items-center mb-4'>
          <MyAvatar user={user} />
          <span className='text-sm font-medium'>{user?.name}</span>
        </div>
        <div className={`${styles['post-image-container']} mb-4`}>
          <img
            src={postImage || '/no-post.jpg'}
            alt='Post'
            className={`${styles['post-image']} w-full max-w-full rounded`}
          />
        </div>

        <h3 className='text-xl font-semibold mb-1 mt-4'>{title}</h3>
        <p className='text-gray-600 mb-2 hidden md:block'>{description}</p>
        <div className='flex items-center text-gray-500 mb-4'>
          <span className='mr-2 font-bold'>{formatTimeAgo(createdAt)}</span>
        </div>
        <div className='flex items-center justify-between'>
          <Button
            type='text'
            icon={isPostLiked ? <HeartFilled /> : <HeartOutlined />}
            className={`text-gray-500 flex items-center ${isPostLiked ? 'text-pink-500' : ''}`}
            onClick={handleLike}
            disabled={isCurrentUserSameAsPoster}
          >
            {isPostLiked ? 'Liked' : 'Like'} ({likes})
          </Button>
          <Button
            type='text'
            icon={<MessageOutlined />}
            className='text-gray-500 flex items-center'
            onClick={handleComment}
          >
            Comment ({commentIds?.length})
          </Button>
          <Button
            type='text'
            icon={<RetweetOutlined />}
            className='text-gray-500 flex items-center'
            disabled={isCurrentUserSameAsPoster}
          >
            Repost
          </Button>
        </div>
        {showComments && (
          <div className='mt-4'>
            <List
              dataSource={allComments}
              renderItem={({ title, userId, createdAt }) => (
                <List.Item>
                  <List.Item.Meta
                    avatar={<MyAvatar user={userId} />}
                    title={userId?.name}
                    description={title}
                  />
                  <div>{formatTimeAgo(createdAt)}</div>
                </List.Item>
              )}
            />
            <div className='flex mt-4'>
              <div className='flex items-center mr-2'>
                <MyAvatar user={loggedInUser} size={32} />
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
                className='flex items-center justify-center'
              />
            </div>
          </div>
        )}
        {isCurrentUserSameAsPoster && (
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
