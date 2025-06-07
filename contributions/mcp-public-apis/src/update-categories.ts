import {fetchPublicApis} from './public-apis.js'

async function main() {
  console.log('Updating categories...')

  const apis = await fetchPublicApis()
  const categories = apis.map(api => api.category) as string[]
  const uniqueCategories = [...new Set(categories)]

  Bun.write(
    'src/public-apis-categories.json',
    JSON.stringify(uniqueCategories, null, 2),
  )

  console.log('Categories updated successfully.')
}

main()
