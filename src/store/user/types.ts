import { IUserProfile } from "@/types";

export interface IUserStore extends IUserProfile {
  init: (userProfile: Partial<IUserProfile>) => void;
}