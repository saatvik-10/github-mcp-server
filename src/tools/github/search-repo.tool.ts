import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { githubService } from '../../services/github.service';
import { searchRepositoriesSchema } from '../../schemas/github/search-repo.schema';

export function registerSearchRepoTool(server: McpServer) {
  server.registerTool(
    'search-repositories',
    {
      title: 'Search Repositories',
      description: 'Searches for GitHub repositories by query',
      inputSchema: searchRepositoriesSchema,
    },
    async ({ query }) => {
      const repos = await githubService.searchRepositories(query);

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
