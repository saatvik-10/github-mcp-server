import { McpServer } from "@modelcontextprotocol/sdk/server/mcp";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio";

const server = new McpServer({
    name: "mcp-server",
    version: "1.0.0"
})

const transport = new StdioServerTransport()

await server.connect(transport)