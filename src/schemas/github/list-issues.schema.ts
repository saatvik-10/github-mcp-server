import { z } from 'zod';

export const listIssuesSchema = {
  owner: z.string().min(1),
  repo: z.string().min(1),
};
