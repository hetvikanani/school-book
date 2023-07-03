/* eslint-disable react/prop-types */
import { useState } from 'react';
import { Button, Input, List } from 'antd';
import {
  HeartOutlined,
  HeartFilled,
  MessageOutlined,
  RetweetOutlined,
  DeleteOutlined,
  SendOutlined,
  EditOutlined,
} from '@ant-design/icons';
import { useDispatch } from 'react-redux';

import { formatTimeAgo, generateUniqueId } from '../../utils';
import MyAvatar from '../MyAvatar/MyAvatar';

import { createComment } from '../../redux/comments/commentsSlice';
import { likePost, updatePostComment } from '../../redux/post/postSlice';
import { updateLikedPostInUser } from '../../redux/reducers';
import { useAllComments, useLoggedInUser, useLoggedInUserId } from '../../hooks';

const PostActios = ({ id, likes, commentIds, isCurrentUserSameAsPoster }) => {
  const loggedInUser = useLoggedInUser();
  const loggedInUserId = useLoggedInUserId();
  const allComments = useAllComments(commentIds);
  const dispatch = useDispatch();

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
    <>
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
    </>
  );
};

export default PostActios;
