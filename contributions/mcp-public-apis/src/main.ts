import {McpServer} from '@modelcontextprotocol/sdk/server/mcp.js'
import {StdioServerTransport} from '@modelcontextprotocol/sdk/server/stdio.js'
import {z} from 'zod'
import packageJson from '../package.json' assert {type: 'json'}
import {logger} from './logger.js'
import categories from './public-apis-categories.json' assert {type: 'json'}
import {fetchPublicApis} from './public-apis.js'

async function main() {
  logger.info('Starting MCP server...')

  const server = new McpServer({
    name: 'Public APIs',
    version: packageJson.version,
  })

  server.tool(
    'get-public-apis',
    'Get list of public APIs from github.com/public-apis',
    {
      categories: z
        .array(z.enum(categories as [string, ...string[]]))
        .describe('Filter APIs by categories'),
      noAuthOnly: z
        .boolean()
        .optional()
        .default(true)
        .describe('Return only APIs that do not require authentication'),
    },
    {readOnlyHint: true, openWorldHint: true},
    async ({categories, noAuthOnly}) => {
      try {
        let apis = await fetchPublicApis()
        if (categories.length) {
          apis = apis.filter(api => categories.includes(api.category))
        }
        if (noAuthOnly) {
          apis = apis.filter(api => api.auth === 'no')
        }

        // Send response as yaml like string to reduce token count
        // ##category1
        // title1 - description1 link1
        // etc.
        const text = Object.entries(Object.groupBy(apis, api => api.category))
          .map(([category, _apis]) => {
            return `##${category}\n${_apis
              ?.map(api => `${api.title} - ${api.description} ${api.link}`)
              .join('\n')}\n`
          })
          .join('\n')

        return {
          content: [{type: 'text', text}],
        }
      } catch (error) {
        return {
          isError: true,
          content: [{type: 'text', text: `Error: ${(error as Error).message}`}],
        }
      }
    },
  )

  // Start receiving messages on stdin and sending messages on stdout
  const transport = new StdioServerTransport()
  await server.connect(transport)

  logger.info('MCP server started')
}

main().catch(error => {
  logger.error('Unhandled error in main', error)
  process.exit(1)
})
