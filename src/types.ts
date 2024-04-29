export interface IUser {
  id: string,
  avatar?: string,
  name: string
}

export interface IComment {
  author: IUser,
  id: string,
  content: string,
  date: Date,
}

export interface IPost {
  author: IUser,
  id: string,
  content: string,
  date: Date,
  likes: number,
  photo?: string,
  comments?: IComment[],
}