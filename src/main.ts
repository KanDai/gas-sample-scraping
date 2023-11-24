const getHtmlString = (url: string) => {
  return UrlFetchApp.fetch(url).getContentText('UTF-8')
}

const getTitle = (htmlString: string) => {
  const matches = htmlString.match(/<title>([^<]+)<\/title>/)

  return matches && matches.length > 1 ? matches[1] : ''
}

const getDescription = (htmlString: string) => {
  const matches = htmlString.match(
    /<meta name="description" content="([^"]+)">/
  )

  return matches && matches.length > 1 ? matches[1] : ''
}

const getUrls = () => {
  const sheet = SpreadsheetApp.getActiveSheet()
  const lastRow = sheet.getLastRow()
  const urls = sheet.getRange(2, 1, lastRow - 1).getValues()
  return urls.flat()
}

const updateSheet = (urls: string[]) => {
  const sheet = SpreadsheetApp.getActiveSheet()
  urls.forEach((url, index) => {
    const htmlString = getHtmlString(url)
    const title = getTitle(htmlString)
    const description = getDescription(htmlString)
    sheet.getRange(index + 2, 2, 1, 2).setValues([[title, description]])
  })
}

const main = () => {
  const urls = getUrls()
  updateSheet(urls)
}
