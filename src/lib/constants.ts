export const AUTH_URL = {
  SIGN_IN: "/users/sign_in",
  SIGN_UP: "/users/sign_up",
  USER_PROFILE: "/users/profile",
  UPDATE_PASSWORD: "/users/update_password",
  PROFILE_AVATAR: "/users/profile/avatar"
}

export const POSTS_URL = {
  POSTS: '/posts',
  UPDATE_POST_PHOTO: '/posts/photo',
  UPLOAD_PHOTO: '/posts/photo',
  USER_POSTS: (userId: string) => `/posts/user/${userId}`,
  COMMENT: (postId: string) => `/posts/${postId}/comment`
}

export const USER_URL = {
  POST_LIKE: (postId: string) => `/posts/${postId}/like`,
  POST_UNLIKE: (postId: string) => `/posts/${postId}/un_like`,
  OTHER_USER_PROFILE: (userId: string) => `/users/profile/${userId}`,
  UPDATE_POST_PHOTO: '/posts/photo',
  UPLOAD_PHOTO: '/posts/photo',
  FOLLOW_USER: (userId: string) => `/users/${userId}/follow`,
  UN_FOLLOW_USER: (userId: string) => `/users/${userId}/un_follow`,
}

export const BREAK_POINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
}