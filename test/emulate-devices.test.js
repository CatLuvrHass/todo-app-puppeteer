const puppeteer = require('puppeteer');

const { devices } = puppeteer;
const iPhoneXR = devices['iPhone XR'];
const iPhone12Pro = devices['iPhone 12 Pro'];
const Galaxy8_landscape = devices['Galaxy S8 landscape'];


(async () => {
    const browser = await puppeteer.launch({
        // devtools: true,
        // timeout: 3000,
        // headless: false,
    });
    const page = await browser.newPage();
    console.log(" ")
    console.log("TESTING VIEW PORTS");
    console.log(" ")
    console.log(" ")
    console.log("setting view port to full page...")
    console.log("saved to 'images/fullpage.png");
    await page.setViewport({ width: 1920, height: 1080 });
    await page.goto('http://localhost:8081/');
    console.log(" ");
    await page.waitForSelector('main');

    console.log("Takes a screenshot of the page...");
    await page.screenshot({path: 'images/fullpage.png',});
    console.log(" ");
    // testing responsiveness
    console.log("Testing responsiveness...");
    console.log("saved to 'images/halfpage.png");
    await page.setViewport({ width: 890, height: 1080 });
    await page.screenshot({path: 'images/halfpage.png',});
    console.log(" ")
    // emulate devices
    console.log("emulate other devices...");
    console.log("saved to 'images/<deviceName>.png");
    await page.emulate(iPhoneXR);
    //capture screenshot of emulated device
    await page.screenshot({ path: 'images/iPhoneXR.png'})

    // emulate devices
    await page.emulate(iPhone12Pro);
    //capture screenshot of emulated device
    await page.screenshot({ path: 'images/iPhone12Pro.png'})

    await page.emulate(Galaxy8_landscape);
    //capture screenshot of emulated device
    await page.screenshot({ path: 'images/galaxy8Landscape.png'})
    console.log(" ")
    console.log(" ")

    await browser.close();
})();



