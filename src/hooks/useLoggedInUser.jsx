import { useMemo } from 'react';
import useLoggedInUserId from './useLoggedInUserId';
import useAllUsers from './useAllUsers';

const useLoggedInUser = () => {
  const loggedInUserId = useLoggedInUserId();
  const allUsers = useAllUsers();

  const loggedInUser = useMemo(
    () => allUsers.find((user) => user.id === loggedInUserId),
    [loggedInUserId, allUsers],
  );

  return loggedInUser;
};

export default useLoggedInUser;
