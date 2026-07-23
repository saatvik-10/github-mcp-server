import { z } from 'zod';

export const listRepositoriesSchema = {
  username: z.string().min(1),
};
