export interface User {
  id: string;
  username: string;
  avatar?: string;
}

export interface Post {
  id: number;
  title: string;
  content: string;
  authorId: string;
  createdAt: string;
  commentCount: number;
}

export interface Comment {
  id: number;
  postId: number;
  content: string;
  authorId: string;
  createdAt: string;
}