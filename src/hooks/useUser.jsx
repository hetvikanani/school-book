import { useMemo } from 'react';
import { useSelector } from 'react-redux';

const useUser = (userId) => {
  const allUsers = useSelector((store) => store.auth.allUsers);

  const user = useMemo(() => allUsers.find((user) => user.id === userId), [allUsers, userId]);

  return user;
};

export default useUser;
