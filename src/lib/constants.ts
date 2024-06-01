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
  COMMENT: (postId: string) => `/posts/${postId}/comment`
}

export const USER_URL = {
  POST_LIKE: (postId: string) => `/posts/${postId}/like`,
  POST_UNLIKE: (postId: string) => `/posts/${postId}/un_like`,
  UPDATE_POST_PHOTO: '/posts/photo',
  UPLOAD_PHOTO: '/posts/photo',
}