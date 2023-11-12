const baseUrl = process.env.REACT_APP_BACKEND_URL

console.log(baseUrl)
export const APIS = {
    searchPixabay: `${baseUrl}/searchPixabay`,
    generateQR: `${baseUrl}/generateQR`,
    searchMLS: `${baseUrl}/mlsSearch`
}