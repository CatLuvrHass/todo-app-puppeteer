const puppeteer = require('puppeteer');

const { devices } = puppeteer;
const iPhoneXR = devices['iPhone XR'];

(async () => {
    const browser = await puppeteer.launch({
        // devtools: true,
        // timeout: 3000,
        // headless: false,
    });
    const page = await browser.newPage();
    
    await Promise.all([
        page.coverage.startCSSCoverage(),
        page.coverage.startJSCoverage(),
    ])

    // emulate devices
    // await page.emulate(iPhoneXR);
    await page.goto('http://localhost:8081/');
    // await page.screenshot({ path: 'iPhoneXR.png' });

    // get the amount of divs on the page
    const divCount = await page.$$eval('div', divs => divs.length);
    
    // get the values of page.
    const html = await page.$eval('.greeting', el => el.outerHTML);  
    const listCountBefore = await page.$$eval('#item.todo-item', divs => divs.length);

    // testing input field
    await page.waitForSelector('input#bugTitle');
    await page.click('input#bugTitle');
    await page.keyboard.type('bug1');
    await page.click('input#bugDesc');
    await page.keyboard.type('this is buggy');
    await page.click('#priority1');
    await page.click('input#add');

    await page.waitForSelector('input#bugTitle');
    await page.click('input#bugTitle');
    await page.keyboard.type('bug1');
    await page.click('input#bugDesc');
    await page.keyboard.type('this is buggy');
    await page.click('#priority1');
    await page.click('input#add');

    const listCount = await page.$$eval('#item.todo-item', divs => divs.length);

    // get the text content of all the `.options` elements:
    const options = await page.$$eval('div > #texth2', options => {
        return options.map(option => option.textContent);
    });

    const searchValue = await page.$eval(
        ('#item.todo-item > div.todo-content > input.to-do'), el => el.value
    );

    const log = await page.evaluate(() => document.querySelector('input#bugDesc').innerText);
    
    page.on('requestfailed', request => {
        console.log(request.failure().errorText, request.url);
    });
    
    // logs
    console.log(divCount);
    console.log(html)
    console.log('list before', listCountBefore)
    console.log('list after', listCount);
    console.log(options);
    console.log(searchValue)

    page.on('console', msg => console.log('PAGE LOG:', msg.text()));
    await page.evaluate(() => console.log(`url is ${location.href}`));


    const [jsCoverage, cssConverage] = await Promise.all([
        page.coverage.stopCSSCoverage(),
        page.coverage.stopJSCoverage(),
    ])
    
    await browser.close();
})();

