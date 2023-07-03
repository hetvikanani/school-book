import { useMemo } from 'react';
import { useSelector } from 'react-redux';

const useAllUsers = () => {
  const allUsers = useSelector((store) => store.auth.allUsers);
  return useMemo(() => allUsers, [allUsers]);
};

export default useAllUsers;
