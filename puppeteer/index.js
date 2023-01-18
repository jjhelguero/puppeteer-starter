const puppeteer = require('puppeteer');
const assert = require('assert');

(async () => {
    const browser = await puppeteer.launch({headless: false})
    const page = await browser.newPage()
    const IMAGE_LENGTH = 4
    const IMAGE_UNIQUE_TEXT = 1
    const IMAGE_DESCRIPTION = 'A random image courtesy of unsplash.com.'
    await page.goto('http://localhost:3000/')

    const pageTitle = await page.$eval('h1', el => el.innerText)
    assert.equal(pageTitle, 'Hello, World!')

    const date = await page.$eval('h4', el => el.innerText)

    const images = await page.$$('.section-style')
    assert.equal(images.length, IMAGE_LENGTH)
    
    const imagesDescription = await page.$$eval('.section-style', images => images.map(image => image.innerText))
    assert.equal(imagesDescription.length, IMAGE_LENGTH)

    const uniqueArray =[... new Set(imagesDescription)]
    assert.equal(uniqueArray.length, IMAGE_UNIQUE_TEXT)

    assert.equal(uniqueArray[0], IMAGE_DESCRIPTION)

    await page.screenshot({path: 'home.png', fullPage: true})

    await browser.close()
})()