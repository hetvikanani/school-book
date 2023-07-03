/* eslint-disable react/prop-types */
import { Card, Tooltip, message } from 'antd';
import { StarFilled } from '@ant-design/icons';
import { useDispatch } from 'react-redux';

import { formatTimeAgo } from '../../utils';
import MyAvatar from '../MyAvatar/MyAvatar';

import styles from './post.module.css';
import { updateSavedPostInUser } from '../../redux/reducers';
import { useLoggedInUser, useLoggedInUserId, useUser } from '../../hooks';
import PostActions from './PostButtons';

const Post = ({
  post: { likes, commentIds, createdAt, id, title, description, postedUserId, postImage },
}) => {
  const user = useUser(postedUserId);
  const loggedInUserId = useLoggedInUserId();
  const loggedInUser = useLoggedInUser();

  const dispatch = useDispatch();
  const isCurrentUserSameAsPoster = loggedInUserId === user.id;
  const isPostSaved =
    loggedInUser?.savedPost?.filter((savedPostId) => savedPostId === id).length > 0;

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
          <div className='flex items-start justify-start flex-col'>
            <span className='text-lg  font-bold'>{user?.name}</span>
            <span className='mr-2 text-gray-500'>{formatTimeAgo(createdAt)}</span>
          </div>
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
        <PostActions
          commentIds={commentIds}
          id={id}
          isCurrentUserSameAsPoster={isCurrentUserSameAsPoster}
          likes={likes}
          title={title}
          description={description}
          postImage={postImage}
        />
      </Card>
    </div>
  );
};

export default Post;
