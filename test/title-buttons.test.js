const puppeteer = require('puppeteer');


// general fields and text

(async () => {
    const browser = await puppeteer.launch({});
    const page = await browser.newPage();
    await page.goto('http://localhost:8081/');
    console.log('TESTING TEXT CONTENT OF MAIN ELEMENTS...');
    console.log(' ');
    console.log("get the text content title...")
    const title = await page.$eval('.title', (el) => el.innerText);
    console.log("'", title, "'");
    console.log(' ');
    
    // get the text content of all the `.h3` elements:
    console.log("get the text content of all the `.h3` elements...")
    const h3 = await page.$$eval('section > h3', headings => {
        return headings.map(heading => heading.textContent);
    });
    console.log(h3);
    console.log(' ');

    // get the text content of all the `.h4` elements:
    console.log("get the text content of all the `.h4` elements...")
    const h4 = await page.$$eval('form > h4', headings => {
        return headings.map(heading => heading.textContent);
    });
    console.log(h4);
    console.log(' ');

    await browser.close();
})();
