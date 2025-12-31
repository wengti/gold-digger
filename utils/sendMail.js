import 'dotenv/config'
import nodemailer from 'nodemailer'
import path from 'node:path'

export async function sendMail(parsedJSON, outputFileName){
    console.log('before log')
    console.log(process.env.GMAIL_USER)
    console.log('after log')

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        // port: 587,
        // secure: false,
        auth: {
            user: process.env.GMAIL_USER,
            pass: process.env.GMAIL_PASS
        }
    })
    
    const info = await transporter.sendMail({
        from: '"Weng Ti Wong" <wengti0608@gmail.com>',
        to: "wengti@hotmail.com",
        subject: `[Gold digger] Transaction at ${parsedJSON.investmentTime}`,
        text: `Attached is a pdf file containing the detail of your latest investment.`,
        // attachments: [
        //     {
        //         filename: outputFileName,
        //         path: path.join("data", outputFileName)
        //     }
        // ]
    })
    console.log('Message sent:', info.messageId)
    // console.log(nodemailer.getTestMessageUrl(info))
}
