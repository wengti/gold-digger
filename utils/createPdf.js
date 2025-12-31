// import PDFDocument from 'pdfkit'
import puppeteer from 'puppeteer';
import fs from 'node:fs/promises'
import path from 'node:path'

export async function createPdf(parsedJSON, __basedir, outputFileName) {
    const { investmentTime, currentGoldPrice, investmentOz, investmentAmount } = parsedJSON
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    
    const imagePath = path.join(__basedir, 'data', 'gold.png')
    const imageBuffer = await fs.readFile(imagePath)
    const base64Image = imageBuffer.toString('base64')
    const imageSrc = `data:image/png;base64,${base64Image}`

    let html = await fs.readFile(path.join("data","template.html"), 'utf8')
    html = html
        .replace("{{time}}", investmentTime)
        .replace("{{price}}", currentGoldPrice)
        .replace("{{oz}}", investmentOz)
        .replace("{{money}}", investmentAmount)
        .replace("{{header-img}}", imageSrc)
    
    await page.setContent(html, { waitUntil: "networkidle0" })

    
    
    await page.pdf({
        path: path.join("data", outputFileName),
        format: "A4",
        printBackground: true,
    });
    
    await browser.close();
    console.log("PDF generated successfully");
}
