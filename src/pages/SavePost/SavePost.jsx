import { useSelector } from 'react-redux';
import { Post } from '../../Components';
import { getUserById, populateSavedPost } from '../../utils';
import { Empty, Typography } from 'antd';
import { BookOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

const SavePost = () => {
  const savedPosts = useSelector((state) =>
    populateSavedPost(
      state.post.allPosts,
      getUserById(state.auth.allUsers, state.auth.loggedInUserId),
    ),
  );

  const renderPosts = () => {
    if (savedPosts.length === 0) {
      return (
        <div className='flex flex-col items-center space-y-4'>
          <Empty
            image={<BookOutlined className='text-gray-300 text-6xl animate-pulse' />}
            description={
              <div>
                <Title level={4} className='text-gray-500'>
                  No Saved Posts
                </Title>
                <Text className='text-gray-500'>You havent saved any posts yet.</Text>
              </div>
            }
          />
        </div>
      );
    }

    return (
      <div className='flex flex-col items-center'>
        <h1 className='text-3xl mb-4'>Saved Posts</h1>
        {[...savedPosts].reverse().map((post) => (
          <Post post={post} key={post.id} />
        ))}
      </div>
    );
  };

  return <div className='p-6'>{renderPosts()}</div>;
};

export default SavePost;
