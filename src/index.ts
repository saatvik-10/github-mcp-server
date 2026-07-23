import { McpServer } from '@modelcontextprotocol/sdk/server/mcp';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio';
import { registerEchoTool } from './tools/echo.tool';
import { registerGithubTools } from './tools/github/index';

const server = new McpServer({
  name: 'mcp-server',
  version: '1.0.0',
});

registerEchoTool(server);
registerGithubTools(server);

const transport = new StdioServerTransport();

await server.connect(transport);
