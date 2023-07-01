/* eslint-disable react/prop-types */
import { Avatar } from 'antd';
import { getAvatarText } from '../../utils';

const MyAvatar = ({ user, size = 40 }) =>
  user?.image ? (
    <Avatar size={size} src={user.image} className='mr-2' />
  ) : (
    <Avatar size={size} className='mr-2'>
      {getAvatarText(user?.name)}
    </Avatar>
  );

export default MyAvatar;
