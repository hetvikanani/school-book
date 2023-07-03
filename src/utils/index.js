import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
dayjs.extend(duration);

export const isEmailExsist = (email, allUsers) => {
  const user = allUsers.filter((user) => user.email === email);
  if (user.length === 0) return false;
  return true;
};

export const generateUniqueId = () => {
  const timestamp = Date.now().toString(36);
  const randomChars = Math.random().toString(36).substring(2, 7);
  return `${timestamp}-${randomChars}`;
};

export const isEmailPasswordValid = (allUsers, newUser) => {
  const exeUser = allUsers.find((user) => user.email === newUser.email);
  if (exeUser) {
    if (exeUser.password === newUser.password) {
      return exeUser;
    } else return false;
  } else {
    return false;
  }
};

export const getAvatarText = (name) => {
  const initials = name
    .split(' ')
    .map((word) => word[0])
    .join('')
    .toUpperCase();
  return initials.length > 1 ? initials.slice(0, 2) : initials;
};

export const formatTimeAgo = (timestamp) => {
  const currentTime = dayjs();
  const targetTime = dayjs(timestamp);
  const diffDuration = dayjs.duration(currentTime.diff(targetTime));

  if (diffDuration.asSeconds() < 60) {
    return 'just now';
  } else if (diffDuration.asHours() < 1) {
    const minutes = Math.floor(diffDuration.asMinutes());
    return `${minutes}m ago`;
  } else if (diffDuration.asDays() < 1) {
    const hours = Math.floor(diffDuration.asHours());
    return `${hours}h ago`;
  } else if (diffDuration.asDays() < 7) {
    const days = Math.floor(diffDuration.asDays());
    return `${days}d ago`;
  } else if (diffDuration.asMonths() < 1) {
    const weeks = Math.floor(diffDuration.asWeeks());
    return `${weeks}w ago`;
  } else {
    const years = Math.floor(diffDuration.asYears());
    return `${years}y ago`;
  }
};
