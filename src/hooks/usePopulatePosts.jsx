import { useMemo } from 'react';
import useLoggedInUser from './useLoggedInUser';
import useAllPosts from './useAllPosts';

const usePopulatePosts = (key) => {
  const loggedInUser = useLoggedInUser();
  const allPosts = useAllPosts();

  const myPosts = useMemo(
    () =>
      loggedInUser[key]
        .map((postId) => allPosts.find((post) => post.id === postId))
        .filter((element) => element !== undefined),
    [loggedInUser, allPosts, key],
  );

  return myPosts;
};

export default usePopulatePosts;
