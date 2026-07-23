import { z } from 'zod';

export const searchRepositoriesSchema = {
  query: z.string().min(1),
};
