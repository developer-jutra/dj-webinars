import {z} from 'zod'
import {logger} from './logger.js'

const CATEGORY_HEADER_PREFIX = '### '
const MARKDOWN_LINK_REGEX = /\[([^\]]*)\]\(([^)]+)\)/ // Allow empty title in link syntax [](...)

const CorsEnum = z.enum(['yes', 'no', 'unknown'])
const HttpsEnum = z.enum(['yes', 'no', 'unknown'])
const AuthEnum = z.enum([
  'oauth',
  'apikey',
  'x-mashape-key',
  'no',
  'user-agent',
  'unknown',
])

export const PublicApiSchema = z.object({
  category: z.string().min(1),
  title: z.string().min(1, 'API title cannot be empty'),
  description: z.string(),
  link: z.string().url('Invalid URL for API link').nullable(),
  auth: AuthEnum,
  https: HttpsEnum,
  cors: CorsEnum,
})

export const PublicApisSchema = z.array(PublicApiSchema)

export type PublicApi = z.infer<typeof PublicApiSchema>

export function parseCors(cors: string): z.infer<typeof CorsEnum> {
  try {
    return CorsEnum.parse(cors.toLowerCase())
  } catch (error) {
    logger.debug(`Unexpected "cors" value: ${cors}`)
    return 'unknown'
  }
}

export function parseHttps(https: string): z.infer<typeof HttpsEnum> {
  try {
    return HttpsEnum.parse(https.toLowerCase())
  } catch (error) {
    logger.debug(`Unexpected "https" value: ${https}`)
    return 'unknown'
  }
}

export function parseAuth(auth: string): z.infer<typeof AuthEnum> {
  try {
    return AuthEnum.parse(auth.toLowerCase())
  } catch (error) {
    logger.debug(`Unexpected "auth" value: ${auth}`)
    return 'unknown'
  }
}

export function cleanString<T>(value: T): T {
  if (typeof value === 'string') {
    return value.trim().replace(/^[`'"']|[`'"']$/g, '') as T
  }
  logger.debug(`Unexpected value type: ${typeof value}`)
  return value
}

export function isCategoryHeader(line: string): boolean {
  return line.startsWith(CATEGORY_HEADER_PREFIX)
}

export function parseCategory(categoryHeader: string): string {
  return categoryHeader.replace(CATEGORY_HEADER_PREFIX, '').trim().toLowerCase()
}

export function isApiRow(line: string): boolean {
  return line.startsWith('|') && line.endsWith('|')
}

export function parseApiRow(row: string): Omit<PublicApi, 'category'> | null {
  const cells = row.split('|').map(cell => cell.trim())
  if (cells.length < 7) {
    logger.debug(`Skipping row due to insufficient cells: ${row}`)
    return null
  }
  const [, apiRaw, descriptionRaw, authRaw, httpsRaw, corsRaw] = cells

  return {
    ...parseApiCell(apiRaw || ''),
    description: descriptionRaw || '',
    auth: parseAuth(authRaw || ''),
    https: parseHttps(httpsRaw || ''),
    cors: parseCors(corsRaw || ''),
  }
}

function parseApiCell(apiCell: string) {
  const cleanedContent = cleanString(apiCell).trim()
  const match = cleanedContent.match(MARKDOWN_LINK_REGEX)
  if (match) {
    // If title in markdown link is empty like "[](url)", use a placeholder or handle as error later
    const title = match[1]?.trim()
    const link = match[2]?.trim()
    return {title: title || link || 'unknown', link: link || null} // If title is empty, use link as title
  }
  // If no markdown link, the whole content is the title, link is null
  return {title: cleanedContent, link: null}
}
