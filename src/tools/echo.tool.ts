import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { EchoService } from '../services/echo.service';
import { echoSchema } from '../schemas/echo.schema';

export function registerEchoTool(server: McpServer) {
  server.registerTool(
    'echo',
    {
      title: 'Echo Tool',
      description: 'Returns the same message back',
      inputSchema: echoSchema,
    },
    async ({ message }) => {
      return EchoService.echo(message);
    },
  );
}
