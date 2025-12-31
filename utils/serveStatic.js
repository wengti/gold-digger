import { sendResponse } from './sendResponse.js'
import { getContentType } from './getContentType.js'
import path from 'node:path'
import fs from 'node:fs/promises'

export const serveStatic = async function (req, res) {

    try {
        const filePath = path.join(
            'public',
            req.url === '/' ? 'index.html' : req.url
        )
        const contentType = getContentType(path.extname(filePath))
        const content = await fs.readFile(filePath)

        sendResponse(res, 200, contentType, content)
    }
    catch (err) {
        console.log(err)
        if (err.code === 'ENOENT'){
            const filePath = path.join('public', '404.html')
            const contentType = getContentType(path.extname(filePath))
            const content = await fs.readFile(filePath)
            sendResponse(res, 404, contentType, content)
        } else {
            sendResponse(res, 500, 'text/html', `<html><h1>Error: ${err} </h1></html>`)
        }
    }
}