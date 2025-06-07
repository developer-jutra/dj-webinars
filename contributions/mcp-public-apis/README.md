# Public APIs MCP

List and search public APIs from
[public-apis](https://github.com/public-apis/public-apis).

## Usage

Add to your `mcp.json` to use latest version from npm:

```json
{
  "public-apis-mcp": {
    "name": "Public APIs",
    "description": "Get list of public APIs from github.com/public-apis",
    "command": "npx",
    "args": ["-y", "public-apis-mcp@latest"]
  }
}
```

## Development

- Requires [Bun](https://bun.sh/)
- Install: `bun install`
- Build: `bun run build`
- Watch: `bun run build:watch`
- Inspector: `bun inspector`

To use your local build add the following to your `mcp.json`:

```json
{
  "public-apis-mcp": {
    "name": "Public APIs",
    "description": "Get list of public APIs from github.com/public-apis",
    "command": "node",
    "args": ["<PATH_TO_THIS_REPO>/build/index.mjs"]
  }
}
```
