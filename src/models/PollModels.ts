import { User } from "./UserModel";

export interface SavePollRequest {
  title: string;
  description: string;
  items: string[];
  isPrivate: boolean;
  closedDate: Date;
  isAnonymous: boolean;
}

export interface AddPollItemsRequest {
  texts: string[];
}

export interface DeletePollItemsRequest {
  ids: string[];
}

export interface PollItem {
  id: string;
  text: string;
  voteCount: number;
}

export interface Poll {
  id: string;
  title: string;
  description: string;
  items: PollItem[];
  isAnonymous: boolean;
  isPrivate: boolean;
  createdAt: Date;
  createdBy: User;
  closedAt: Date;
  closedDate: Date;
}
