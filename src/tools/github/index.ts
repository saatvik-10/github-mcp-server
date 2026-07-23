import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { registerCreateIssueTool } from './create-issue.tool';
import { registerListRepoTool } from './list-repo.tool';
import { registerRepoDetailsTool } from './repo-details.tool';
import { registerListIssuesTool } from './list-issue.tool';
import { registerSearchRepoTool } from './search-repo.tool';

export function registerGithubTools(server: McpServer) {
  registerCreateIssueTool(server);
  registerListRepoTool(server);
  registerRepoDetailsTool(server);
  registerListIssuesTool(server);
  registerSearchRepoTool(server);
}
