export interface IUser {
  id: string,
  name: string,
  avatar?: string,
}

export interface IUserProfile extends IUser {
  gender?: Gender,
  email: string,
  createdAt: Date | null,
  followers: IFollow[],
  following: IFollow[],
  likes: {
    id: string,
    createdAt: Date
  }[]
}

export interface IFollow {
  user: IUser,
  createdAt: Date
}

export interface IComment {
  user: IUser,
  id: string,
  comment: string,
  createdAt: Date,
}

export interface IPost {
  user: IUser,
  id: string,
  title: string,
  content: string,
  createdAt: Date,
  likes: { user: "string" }[],
  photo?: string,
  comments?: IComment[],
}

export enum TIME_SORT {
  ASC = 'asc',
  DESC = 'desc'
}

export type Gender = 'female' | 'male'