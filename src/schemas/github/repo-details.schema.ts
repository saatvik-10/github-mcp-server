import { z } from 'zod';

export const repositoryDetailsSchema = {
  owner: z.string().min(1),
  repo: z.string().min(1),
};
