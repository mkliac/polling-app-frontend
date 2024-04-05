import { User } from "./UserModel";

export interface SavePollRequest {
  title: string;
  description: string;
  items: string[];
  private: boolean;
  closedDate: Date;
  anonymous: boolean;
}

export interface UpdatePollRequest {
  id: string;
  title: string;
  description: string;
  removeItemIds: string[];
  addItemTexts: string[];
  closedDate: Date;
}

export interface GetPollsRequest {
  userId?: string;
  pageNumber?: number;
  pageSize?: number;
  sortBy?: string;
  isAscending?: boolean;
  filterType?: PollFitlerType;
  search?: string;
}

export interface GetVotersRequest {
  pollId: string;
  itemId: string;
  pageNumber?: number;
  pageSize?: number;
}

export interface BookmarkRequest {
  pollId: string;
  isBookmark: boolean;
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
  owner: boolean;
  createdAt: Date;
  createdBy: User;
  closedDate: Date;
  bookmarked: boolean;
}

export enum PollFilter {
  PUBLIC = "PUBLIC",
  MY_POLLS = "MY_POLLS",
  USER = "USER",
  BOOKMARKED = "BOOKMARKED",
}

export type PollFitlerType =
  | PollFilter.PUBLIC
  | PollFilter.MY_POLLS
  | PollFilter.USER
  | PollFilter.BOOKMARKED;
