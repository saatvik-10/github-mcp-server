export interface Repository {
  name: string;
  description: string | null;
  stars: number;
  forks: number;
  language: string | null;
  url: string;
  private: boolean;
}

export interface RepositoryDetails {
  name: string;
  description: string | null;
  stars: number;
  forks: number;
  language: string | null;
  openIssues: number;
  watchers: number;
  defaultBranch: string;
  url: string;
}

export interface Issue {
  number: number;
  title: string;
  state: string;
  author: string;
  createdAt: Date;
  url: string;
}

export interface SearchRepository {
  name: string;
  owner: string;
  description: string | null;
  stars: number;
  url: string;
}
