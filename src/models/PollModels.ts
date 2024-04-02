import { User } from "./UserModel";

export interface SavePollRequest {
  title: string;
  description: string;
  items: string[];
  private: boolean;
  closedDate: Date;
  anonymous: boolean;
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
  voted: boolean;
}

export interface Poll {
  id: string;
  title: string;
  description: string;
  items: PollItem[];
  anonymous: boolean;
  private: boolean;
  createdAt: Date;
  createdBy: User;
  closedDate: Date;
  bookmarked: boolean;
}

export enum PollFilter {
  ALL = "ALL",
  USER = "USER",
  BOOKMARKED = "BOOKMARKED",
}

export type PollFitlerType =
  | PollFilter.ALL
  | PollFilter.USER
  | PollFilter.BOOKMARKED;
