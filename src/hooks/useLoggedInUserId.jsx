import { useSelector } from 'react-redux';
import { useMemo } from 'react';

const useLoggedInUserId = () => {
  const loggedInUserId = useSelector((store) => store.auth.loggedInUserId);
  return useMemo(() => loggedInUserId, [loggedInUserId]);
};

export default useLoggedInUserId;
