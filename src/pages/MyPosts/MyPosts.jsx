import { Post } from '../../Components';
import { Empty, Typography } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import { usePopulatePosts } from '../../hooks';

const { Title, Text } = Typography;

const MyPosts = () => {
  const myPosts = usePopulatePosts('myPosts');
  const renderPosts = () => {
    if (myPosts.length === 0) {
      return (
        <div className='flex flex-col items-center space-y-4'>
          <Empty
            image={<InboxOutlined className='text-gray-300 text-6xl animate-pulse' />}
            description={
              <div>
                <Title level={4} className='text-gray-500'>
                  Empty Page
                </Title>
                <Text className='text-gray-500'>You dont have any posts. Start creating some!</Text>
              </div>
            }
          />
        </div>
      );
    }

    return (
      <div className='flex flex-col items-center'>
        <h1 className='text-3xl mb-4'>My Posts</h1>
        {[...myPosts].reverse().map((post) => (
          <Post post={post} key={post.id} />
        ))}
      </div>
    );
  };

  return <div className='p-6'>{renderPosts()}</div>;
};

export default MyPosts;
