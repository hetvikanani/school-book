import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import useAllUsers from './useAllUsers';

const useAllComments = (commentIds) => {
  const allComments = useSelector((store) => store.comment.allComments);
  const allUsers = useAllUsers();

  const comments = useMemo(() => {
    return commentIds
      .map((commentId) => allComments.find((comment) => comment.id === commentId))
      .filter((comment) => comment !== undefined)
      .map((comment) => ({
        ...comment,
        userId: allUsers.find((user) => user.id === comment.userId),
      }));
  }, [commentIds, allComments, allUsers]);

  return comments;
};

export default useAllComments;
