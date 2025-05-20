import { McpServer, ResourceTemplate } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { z } from 'zod';
import fs from 'fs';
import path from 'path';
import { ListResourcesRequestSchema } from '@modelcontextprotocol/sdk/types.js';

const DOCS_DIR = path.join(process.cwd(), 'docs');

// Initialize MCP Server
const server = new McpServer({
  name: "Markdown Resources Server",
  version: "1.0.0",
  description: "A server that can search and summarize markdown files"
});

// Helper: list all markdown files in the docs directory
function listMarkdownFiles() {
  return fs.readdirSync(DOCS_DIR)
    .filter(file => file.endsWith('.md'))
    .map(file => ({
      name: file,
      path: path.join(DOCS_DIR, file),
      content: fs.readFileSync(path.join(DOCS_DIR, file), 'utf-8'),
    }));
}

// debugging
// console.log(listMarkdownFiles());

// server.setRequestHandler(ListResourcesRequestSchema, async (params) => {
//   const files = listMarkdownFiles();

//   if (params?.keyword) {
//     const keyword = params.keyword.toLowerCase();
//     return {
//       resources: files
//         .filter(file => file.content.toLowerCase().includes(keyword))
//         .map(file => ({
//           uri: `docs://${file.name}`,
//           text: `Contains "${params.keyword}": ${file.name}`
//         }))
//     };
//   }

//   const result = {
//     resources: files.map(file => ({
//       uri: `docs://${file.name}`,
//       text: file.name
//     }))
//   };

//   console.error(result);
//   return result;
// });

// Document Resources
server.resource(
  "markdown-files",
  {
    uri: "docs://{filename}",
    list: z.object({
      keyword: z.string().optional().describe("Filter files by content keyword")
    })
  },
  async (uri, params) => {
    const files = listMarkdownFiles();

    if (params?.keyword) {
      const keyword = params.keyword.toLowerCase();
      return {
        resources: files
          .filter(file => file.content.toLowerCase().includes(keyword))
          .map(file => ({
            uri: `docs://${file.name}`,
            text: `Contains "${params.keyword}": ${file.name}`
          }))
      };
    }

    const result = {
      resources: files.map(file => ({
        uri: `docs://${file.name}`,
        text: file.name
      }))
    };

    console.error(result);
    return result;
  }
);

// Document Tools
server.tool(
  "search-markdown",
  z.object({
    keyword: z.string().describe("Search term"),
    contextWindow: z.number().optional().default(100)
  }),
  async ({ keyword, contextWindow }) => {
    const files = fs.readdirSync(DOCS_DIR)
      .filter(file => file.endsWith('.md'))
      .map(file => ({
        name: file,
        content: fs.readFileSync(path.join(DOCS_DIR, file), 'utf-8')
      }));

    const results = files.flatMap(file => {
      const index = file.content.toLowerCase().indexOf(keyword.toLowerCase());
      if (index === -1) return [];
      
      return [{
        type: "text",
        text: `📄 ${file.name}:\n"${
          file.content
            .substring(
              Math.max(0, index - contextWindow/2),
              Math.min(file.content.length, index + contextWindow/2)
            )
            .replace(/\n/g, ' ')
        }..."`
      }];
    });

    return { content: results };
  }
);

server.tool(
  "summarize-markdown",
  z.object({
    filename: z.string().describe("Name of markdown file"),
    maxLength: z.number().optional().default(200)
  }),
  async ({ filename, maxLength }) => {
    const filePath = path.join(DOCS_DIR, filename);
    if (!fs.existsSync(filePath)) {
      throw new Error(`File not found: ${filename}`);
    }
    
    const content = fs.readFileSync(filePath, 'utf-8');
    const summary = content
      .replace(/\n/g, ' ')
      .substring(0, maxLength)
      + (content.length > maxLength ? '...' : '');

    return {
      content: [{
        type: "text",
        text: `SUMMARY OF ${filename}:\n"${summary}"`
      }]
    };
  }
);

// Server Initialization
const transport = new StdioServerTransport();
server.connect(transport);
