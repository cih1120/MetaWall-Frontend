import { IUserProfile } from "@/types";

export interface IUserStore extends Omit<IUserProfile, "_id"> {
  init: (userProfile: Partial<IUserProfile>) => void;
}