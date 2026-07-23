import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { githubService } from '../../services/github.service';
import { repositoryDetailsSchema } from '../../schemas/github/repo-details.schema';

export function registerRepoDetailsTool(server: McpServer) {
  server.registerTool(
    'repository-details',
    {
      title: 'Repository Details',
      description: 'Returns details of a specific GitHub repository',
      inputSchema: repositoryDetailsSchema,
    },
    async ({ owner, repo }) => {
      const details = await githubService.repositoryDetails(owner, repo);

      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(details, null, 2),
          },
        ],
      };
    },
  );
}
