import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { githubService } from '../../services/github.service';
import { createIssueSchema } from '../../schemas/github/create-issue.schema';

export function registerCreateIssueTool(server: McpServer) {
  server.registerTool(
    'create-issue',
    {
      title: 'Create Issue',
      description: 'Creates a new issue in a GitHub repository',
      inputSchema: createIssueSchema,
    },
    async ({ owner, repo, title, body }) => {
      const issue = await githubService.createIssue(owner, repo, title, body);

      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(issue, null, 2),
          },
        ],
      };
    },
  );
}
