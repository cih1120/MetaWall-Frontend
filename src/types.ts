export interface IUser {
  _id: string,
  name: string,
  avatar?: string,
}

export interface IUserProfile extends Omit<IUser, '_id'> {
  id: string,
  gender?: Gender,
  email: string,
  createdAt: Date | null,
  followers: IUser[],
  following: IUser[]
}

export interface IComment {
  user: IUser,
  _id: string,
  comment: string,
  createdAt: Date,
}

export interface IPost {
  user: IUser,
  _id: string,
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