export const ALL_USERS = [
  {
    id: 'ljikoodg-p2mwt',
    name: 'Hetvi Kanani',
    email: 'hetvi@gmail.com',
    password: '123456',
    college: 'Marwadi',
    dob: 1688129443709,
    image: '/insta.png',
    savedPost: [],
    myPosts: ['123456789', '1234567890', '12345678901'],
    likedPost: [],
  },
  {
    id: 'ljikoodg-john',
    name: 'John Doe',
    email: 'john@gmail.com',
    password: '123456',
    college: 'Marwadi',
    dob: 1688129443709,
    image: null,
    savedPost: [],
    myPosts: ['12345678902', '12345678903'],
    likedPost: [],
  },
];

export const ALL_POSTS = [
  {
    id: '123456789',
    title: 'New post by hetvi',
    description: 'New post 1 description',
    postedUserId: 'ljikoodg-p2mwt',
    createdAt: 1688129443709,
    isRepost: false,
    likes: 8,
    commentIds: ['comment-id-1', 'comment-id-3'],
    postImage: '/pink-keyboard.jpg',
  },
  {
    id: '1234567890',
    title: 'Hetvi magic world',
    description: 'Share like subscribe',
    postedUserId: 'ljikoodg-p2mwt',
    createdAt: 1688129443709,
    isRepost: false,
    likes: 5,
    commentIds: ['comment-id-2'],
    postImage: '/do-some.jpg',
  },

  {
    id: '12345678902',
    title: 'Delicious Recipes',
    description: 'Sharing some mouthwatering recipes to satisfy your taste buds.',
    postedUserId: 'ljikoodg-john',
    createdAt: 1688199699509,
    isRepost: false,
    likes: 0,
    commentIds: ['comment-id-4', 'comment-id-5'],
    postImage: '/pink-keyboard.jpg',
  },
  {
    id: '12345678901',
    title: 'Capturing Memories',
    description: 'Preserving precious memories through the lens of a camera.',
    postedUserId: 'ljikoodg-p2mwt',
    createdAt: 1688129443709,
    isRepost: false,
    likes: 4,
    commentIds: [],
    postImage: '/do-some.jpg',
  },
  {
    id: '12345678903',
    title: 'Exploring Nature',
    description: 'A beautiful day spent exploring the wonders of nature.',
    postedUserId: 'ljikoodg-john',
    createdAt: 1688199699509,
    isRepost: false,
    likes: 0,
    commentIds: ['comment-id-6'],
    postImage: '/pink-keyboard.jpg',
  },
];

export const ALL_COMMENTS = [
  {
    id: 'comment-id-1',
    title: 'Great photo!',
    userId: 'ljikoodg-p2mwt',
    createdAt: 1688129443709,
    postId: '123456789',
  },
  {
    id: 'comment-id-2',
    title: 'I love this place!',
    userId: 'ljikoodg-p2mwt',
    createdAt: 1688129443709,
    postId: '123456789',
  },
  {
    id: 'comment-id-3',
    title: 'Delicious recipe!',
    userId: 'ljikoodg-p2mwt',
    createdAt: 1688129443709,
    postId: '1234567890',
  },
  {
    id: 'comment-id-4',
    title: 'Amazing post!',
    userId: 'ljikoodg-p2mwt',
    createdAt: 1688129443709,
    postId: '12345678902',
  },
  {
    id: 'comment-id-5',
    title: 'Keep it up!',
    userId: 'ljikoodg-john',
    createdAt: 1688299699509,
    postId: '12345678902',
  },
  {
    id: 'comment-id-6',
    title: 'Nice work!',
    userId: 'ljikoodg-john',
    createdAt: 1688299699509,
    postId: '12345678903',
  },
];
