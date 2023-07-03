import { useSelector } from 'react-redux';

const useIsLoggedIn = () => {
  const isLoggedIn = useSelector((store) => store.auth.isLoggedIn);
  return isLoggedIn;
};

export default useIsLoggedIn;
