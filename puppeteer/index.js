const puppeteer = require('puppeteer')

async function run() {
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    await page.goto('https://phptravels.com/demo/')

    await page.screenshot({path: 'home.png', fullPage: true})

    await browser.close()
}

run()