import { getGoldPrice } from '../utils/getGoldPrice.js'
import { sendResponse } from '../utils/sendResponse.js'

export const handleServerEvent = function (req, res) {
    try {
        res.setHeader('Content-Type', 'text/event-stream')
        res.setHeader('Cache-Control', 'no-cache')
        res.setHeader('Connection', 'keep-alive')
    
        // Send an event update every 2s
        const intervalId = setInterval(() => {
            res.write(`data: ${JSON.stringify({ goldPrice: getGoldPrice() })}\n\n`)
        }, 2000)
    
        req.on('close', () => {
            clearInterval(intervalId)
            res.end()
        })
    }
    catch(err){
        console.error(`Error: ${err}`)
    }
}