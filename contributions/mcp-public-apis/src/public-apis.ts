import {
  type PublicApi,
  isApiRow,
  isCategoryHeader,
  parseApiRow,
  parseCategory,
} from './public-apis.utils.js'

let cache: PublicApi[] | null = null

export async function fetchPublicApis() {
  if (cache) return cache

  const markdown = await fetchPublicApisMarkdown()
  const apis = parsePublicApisMarkdown(markdown)
  cache = apis
  return apis
}

export function parsePublicApisMarkdown(markdown: string) {
  const lines = markdown.split('\n')
  const apis: PublicApi[] = []
  let category = ''

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]?.trim()
    if (!line) {
      category = ''
      continue
    }

    if (isCategoryHeader(line)) {
      category = parseCategory(line)
      i += 2 // skip header and separator
      continue
    }

    if (isApiRow(line)) {
      const api = parseApiRow(line)
      if (api) {
        apis.push({...api, category})
      }
    }
  }

  return apis
}

async function fetchPublicApisMarkdown() {
  const readmeUrl =
    'https://raw.githubusercontent.com/public-apis/public-apis/refs/heads/master/README.md'
  const response = await fetch(readmeUrl)
  if (!response.ok) {
    throw new Error(
      `Failed to fetch README: ${response.status} ${response.statusText}`,
    )
  }
  return await response.text()
}
