import { McpServer } from '@modelcontextprotocol/sdk/server/mcp';
import { githubService } from '../../services/github.service';
import { listIssuesSchema } from '../../schemas/github/list-issues.schema';

export function registerListIssuesTool(server: McpServer) {
  server.registerTool(
    'list-issues',
    {
      title: 'List Issues',
      description: 'Returns the list of issues for a GitHub repository',
      inputSchema: listIssuesSchema,
    },
    async ({ owner, repo }) => {
      const issues = await githubService.listIssues(owner, repo);

      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(issues, null, 2),
          },
        ],
      };
    },
  );
}
