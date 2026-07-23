import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { githubService } from '../../services/github.service';
import { listRepositoriesSchema } from '../../schemas/github/list-repo.schema';

export function registerListRepoTool(server: McpServer) {
  server.registerTool(
    'list-repositories',
    {
      title: 'List Repositories',
      description: "Returns the list of user's github repositories",
      inputSchema: listRepositoriesSchema,
    },
    async ({ username }) => {
      const repos = await githubService.listRepositories(username);

      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(repos, null, 2),
          },
        ],
      };
    },
  );
}
