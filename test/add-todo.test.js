const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({});
    const page = await browser.newPage();
    await page.goto('http://localhost:8081/');

    console.log('TESTING BASIC FUNCTIONALITY OF TO DO APP...');
    console.log(' ');
    console.log("Taking screenshot before action...");
    console.log("find in image_actions/01_initial_image.png");
    console.log(" ");
    
    await page.setViewport({ width: 890, height: 1080 });
    await page.screenshot({path: 'image_actions/01_initial_image.png',});

    const listCountBeforefail = await page.$$eval('#item.todo-item', divs => divs.length);
    
    // testing input field
    await page.waitForSelector('input#bugTitle');
    await page.click('input#bugTitle');
    console.log("typing bug Title...");
    await page.keyboard.type('bug1');
    await page.click('input#bugDesc');
    const bugTitle_1_fail = await page.$eval(('input#bugTitle'), el => el.value);    
    console.log(bugTitle_1_fail);
    
    console.log(" ");
    console.log("Clicking Add bug todo...");
    await page.click('input#add');
    
    console.log(" ");
    console.log("Taking ScreenShotAfter...");
    console.log("find in image_actions/02_Add_button_fail.png");
    console.log(" ")

    const listCountAfterfail = await page.$$eval('#item.todo-item', divs => divs.length);

    console.log('todo list length before', listCountBeforefail)
    console.log('todo list length after', listCountAfterfail);
    
    await page.screenshot({path: 'image_actions/02_Add_button_fail.png'});


    console.log("Taking screenshot before action...");
    console.log("refer to images_actions/03_initial_correcting_action.png")
    console.log(" ")

    await page.setViewport({ width: 890, height: 1080 });
    await page.screenshot({path: 'image_actions/03_initial_correcting_action.png',});

    const listCountBefore = await page.$$eval('#item.todo-item', divs => divs.length);

    // testing input field
    await page.waitForSelector('input#bugTitle');
    await page.click('input#bugTitle');
    await page.click('input#bugDesc');
    console.log("typing bug description...");    
    console.log(" ")
    await page.keyboard.type('this is buggy');
    await page.click('#priority1');
    await page.click('input#add');

    const bugTitle_1 = await page.$eval(
        ('#item.todo-item > div.todo-content > input.to-do'), el => el.value
    );

    const bugDesc_1 = await page.$eval(
        ('#item.todo-item > div.todo-content > textarea.to-do'), el => el.value
    );
    console.log("Bug Title: ", bugTitle_1);
    console.log("Bug Description:", bugDesc_1);
    console.log(" ")

    const listCountAfter = await page.$$eval('#item.todo-item', divs => divs.length);

    console.log('todo list length before', listCountBefore)
    console.log('todo list length after', listCountAfter);
    console.log(" ")
    console.log(" ")

    // get the text content of all the `#texth2` elements which are title and description of to-do list:
    content = await page.$$eval('div > #texth2', content => {
        return content.map(text => text.textContent);
    });
    console.log("Taking ScreenShotAfter");
    console.log("Find in image_actions/04_final_image_correct_action.png");
    await page.screenshot({path: 'image_actions/04_final_image_correct_action.png',});
    
    await browser.close();
})();
