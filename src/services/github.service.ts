import { env } from '../config/env';
import type {
  Repository,
  RepositoryDetails,
  Issue,
  SearchRepository,
} from '../types/github.types';

import type {
  GitHubRepository,
  GitHubRepositoryDetails,
  GitHubSearchResponse,
  GitHubIssue,
} from '../types/github.api.types';

class GithubService {
  private readonly baseUrl = 'https://api.github.com';
  private readonly token = env.GITHUB_TOKEN;

  private async request<T>(
    endpoint: string,
    options?: RequestInit,
  ): Promise<T> {
    const headers = {
      Authorization: `Bearer ${this.token}`,
      Accept: 'application/vnd.github+json',
      ...options?.headers,
    };

    const res = await fetch(`${this.baseUrl}${endpoint}`, {
      ...options,
      headers,
    });

    if (!res.ok) {
      const body = await res.text();
      throw new Error(`[${res.status}] ${endpoint}: ${body}`);
    }

    return res.json() as Promise<T>;
  }

  async listRepositories(username: string): Promise<Repository[]> {
    const repos = await this.request<GitHubRepository[]>(
      `/users/${username}/repos`,
      {
        method: 'GET',
      },
    );

    return repos.map((repo) => ({
      name: repo.name,
      description: repo.description,
      stars: repo.stargazers_count,
      forks: repo.forks_count,
      language: repo.language,
      url: repo.html_url,
      private: repo.private,
    }));
  }

  async repositoryDetails(
    owner: string,
    repo: string,
  ): Promise<RepositoryDetails> {
    const repoDetail = await this.request<GitHubRepositoryDetails>(
      `/repos/${owner}/${repo}`,
      {
        method: 'GET',
      },
    );

    return {
      name: repoDetail.name,
      description: repoDetail.description,
      stars: repoDetail.stargazers_count,
      forks: repoDetail.forks_count,
      language: repoDetail.language,
      openIssues: repoDetail.open_issues_count,
      watchers: repoDetail.watchers_count,
      defaultBranch: repoDetail.default_branch,
      url: repoDetail.html_url,
    };
  }

  async searchRepositories(query: string): Promise<SearchRepository[]> {
    const res = await this.request<GitHubSearchResponse>(
      `/search/repositories?q=${encodeURIComponent(query)}`,
      {
        method: 'GET',
      },
    );

    return res.items.map((repo) => ({
      name: repo.name,
      owner: repo.owner.login,
      description: repo.description,
      stars: repo.stargazers_count,
      url: repo.html_url,
    }));
  }

  async listIssues(owner: string, repo: string): Promise<Issue[]> {
    const repoIssues = await this.request<GitHubIssue[]>(
      `/repos/${owner}/${repo}/issues`,
      {
        method: 'GET',
      },
    );

    return repoIssues.map((issue) => ({
      number: issue.number,
      title: issue.title,
      state: issue.state,
      author: issue.user.login,
      createdAt: new Date(issue.created_at),
      url: issue.html_url,
    }));
  }

  async createIssue(
    owner: string,
    repo: string,
    title: string,
    body?: string,
  ): Promise<Issue> {
    const issue = await this.request<GitHubIssue>(
      `/repos/${owner}/${repo}/issues`,
      {
        method: 'POST',
        body: JSON.stringify({
          title,
          body,
        }),
      },
    );

    return {
      number: issue.number,
      title: issue.title,
      state: issue.state,
      author: issue.user.login,
      createdAt: new Date(issue.created_at),
      url: issue.html_url,
    };
  }
}

export const githubService = new GithubService();
