export const ALL_POST = [
  {
    id: '123456789',
    title: 'Exploring Nature',
    description: 'A beautiful day spent exploring the wonders of nature.',
    postedUserId: 'ljikoodg-p2mwt',
    createdAt: 1688129443709,
    isRepost: false,
    likes: 8,
    commentIds: ['comment-id-1', 'comment-id-3'],
    postImage: '/pink-keyboard.jpg',
  },
  {
    id: '1234567890',
    title: 'Delicious Recipes',
    description: 'Sharing some mouthwatering recipes to satisfy your taste buds.',
    postedUserId: 'ljikoodg-p2mwt',
    createdAt: 1688129443709,
    isRepost: false,
    likes: 5,
    commentIds: ['comment-id-2'],
    postImage: '/do-some.jpg',
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
];
