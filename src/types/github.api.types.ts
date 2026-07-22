export interface GitHubRepository {
  name: string;
  description: string | null;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  html_url: string;
  private: boolean;
}

export interface GitHubRepositoryDetails {
  name: string;
  description: string | null;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  open_issues_count: number;
  watchers_count: number;
  default_branch: string;
  html_url: string;
}

export interface GitHubSearchRepository {
  name: string;
  owner: {
    login: string;
  };
  description: string | null;
  stargazers_count: number;
  html_url: string;
}

export interface GitHubSearchResponse {
  items: GitHubSearchRepository[];
}

export interface GitHubIssue {
  number: number;
  title: string;
  state: string;
  user: {
    login: string;
  };
  created_at: string;
  html_url: string;
}
