const puppeteer = require('puppeteer');
const assert = require('assert');

it('should run ', async () => {
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    const IMAGE_LENGTH = 4
    const IMAGE_UNIQUE_LENGTH = 1
    const IMAGE_DESCRIPTION = 'A random image courtesy of unsplash.com.'
    const IMAGE_SRC = 'https://source.unsplash.com/random/400x200'
    const todayDate = new Date().toDateString()

    await page.goto('http://localhost:3000/')

    const pageTitle = await page.$eval('h1', el => el.innerText)
    assert.equal(pageTitle, 'Hello, World!')

    const date = await page.$eval('h4', el => el.innerText)
    assert.equal(date, todayDate)

    const images = await page.$$('.section-style')
    assert.equal(images.length, IMAGE_LENGTH)
    
    const imagesDescription = await page.$$eval('.section-style', images => images.map(image => image.innerText))
    assert.equal(imagesDescription.length, IMAGE_LENGTH)

    const uniqueArray =[... new Set(imagesDescription)]
    assert.equal(uniqueArray.length, IMAGE_UNIQUE_LENGTH)

    assert.equal(uniqueArray[0], IMAGE_DESCRIPTION)

    const imageSrc = await page.$$eval('.section-style img', images => images.map(image => image.src))
    const uniqueImageSrc =[... new Set(imageSrc)]
    assert.equal(uniqueImageSrc.length, IMAGE_UNIQUE_LENGTH)

    assert.equal(uniqueImageSrc[0], IMAGE_SRC)

    await page.screenshot({path: 'home.png', fullPage: true})

    await browser.close()
})