

export const sendResponse = function (res, statusCode, contentType, payload){
    res.statusCode = statusCode
    res.setHeader('Content-Type', contentType)
    res.end(payload)
}