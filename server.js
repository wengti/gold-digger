

import http from 'node:http'
import { serveStatic } from './utils/serveStatic.js'

import { handleServerEvent } from './events/handleServerEvent.js'
import { handlePost } from './routeHandler/routeHandler.js'
import { sendResponse } from './utils/sendResponse.js'

const __dirname = import.meta.dirname


const server = http.createServer(async (req, res) => {

    if (req.url === '/api') {

        if (req.method === 'POST') {
            return await handlePost(req, res, __dirname)
        }
        else{
            return sendResponse(res, 400, 'text/html', `<html><h1>Error: ${req.method} is not available. </h1></html>`)
        }

    }
    else if (req.url === '/event') {
        return handleServerEvent(req, res)
    }
    else {
        return await serveStatic(req, res)
    }
})


const PORT = 8000
server.listen(PORT, () => console.log(`The server is connected on PORT ${PORT}.`))