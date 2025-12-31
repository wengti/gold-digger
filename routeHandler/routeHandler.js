
import { parseJSONBody } from '../utils/parseJSONBody.js'
import { sendResponse } from '../utils/sendResponse.js'
import { createPdf } from '../utils/createPdf.js'
import {sendMail} from '../utils/sendMail.js'

import fs from 'node:fs/promises'
import path from 'node:path'

export const handlePost = async function (req, res, __basedir) {
    try {
        const parsedJSON = await parseJSONBody(req)
        const filePath = path.join('data', 'purchaseRecord.txt')

        let fileContent = await fs.readFile(filePath, 'utf8')
        if (!fileContent) {
            fileContent = []
        } else {
            fileContent = JSON.parse(fileContent)
        }

        fileContent.push(parsedJSON)
        await fs.writeFile(filePath, JSON.stringify(fileContent, null, 2))

        const outputFileName = `transaction-${parsedJSON.investmentTime.replaceAll('/', '').replaceAll(',', '').replaceAll(' ', '_').replaceAll(':', "_")}.pdf`
        await createPdf(parsedJSON, __basedir, outputFileName)

        await sendMail(parsedJSON, outputFileName)

        sendResponse(res, 201, 'application/json', JSON.stringify(parsedJSON))
    }
    catch (err) {
        sendResponse(res, 500, 'application/json', JSON.stringify({ message: `Error: ${err}` }))
    }
}