export interface IUser {
  _id: string,
  name: string,
}

export interface IUserProfile extends IUser {
  id: string,
  avatar?: string,
  gender: Gender,
  email: string,
  createdAt: Date,
  followers: IUser[],
  following: IUser[]
}

export interface IComment {
  user: IUser,
  _id: string,
  content: string,
  createdAt: Date,
}

export interface IPost {
  user: IUser,
  _id: string,
  title: string,
  content: string,
  createdAt: Date,
  likes: number,
  photo?: string,
  comments?: IComment[],
}

export enum TIME_SORT {
  ASC = 'asc',
  DESC = 'desc'
}

export type Gender = 'female' | 'male'