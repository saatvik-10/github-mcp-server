import { z } from 'zod';

export const createIssueSchema = {
  owner: z.string().min(1),
  repo: z.string().min(1),
  title: z.string().min(1),
  body: z.string().optional(),
};
