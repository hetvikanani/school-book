import { useSelector } from 'react-redux';
import { useMemo } from 'react';

const useAllPosts = () => {
  const posts = useSelector((store) => store.post.allPosts);

  return useMemo(() => posts, [posts]);
};

export default useAllPosts;
