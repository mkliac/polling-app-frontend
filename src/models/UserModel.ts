export interface User {
  username: string;
  picture: string;
  email: string;
  createdAt: Date;
  pollCount?: number;
  followerCount?: number;
  followingCount?: number;
  following?: boolean;
}

export interface GetUsersRequest {
  userId: string;
  pageNumber?: number;
  pageSize?: number;
}
