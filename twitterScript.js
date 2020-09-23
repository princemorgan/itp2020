
import puppeteer from 'puppeteer';
const username = 'xxxxx'
const password = 'xxxxx'

const browser = await puppeteer.launch({headless: false});

const page = await browser.newPage();


console.log('going to twitter')
await page.goto('https://www.twitter.com/');

await page.setViewport({width: 1280, height: 720});

console.log('open the browser window, and login to twitter:');
/*
//Below is the code from class
const messengerContainer = await page.waitForSelector('.DraftEditor-editorContainer');

await messengerContainer.click();

await page.keyboard.type('Some interesting reads https://www.foxnews.com/politics/marjorie-greene-georgia-gop-says-shes-not-a-qanon-candidate', {delay: 100});

const tweetButton = await page.waitForSelector('a[data-testid=addButton]');

await tweetButton.click();

// add another tweet dialog comes up.  lets wait a few seconds.
console.log('waiting 3 seconds');
await page.waitForTimeout(3000);

console.log('typing a second tweet');
await page.keyboard.type('This one too  https://www.theatlantic.com/technology/archive/2020/09/reddit-qanon-ban-evasion-policy-moderation-facebook/616442/', { delay: 100});

const tweetAgainButton = await page.waitForSelector('div[data-testid=tweetButton]')
await tweetAgainButton.click();
*/
//here ends everything from the Puppeteer tutorial. 

//Now let's search for a hashtag
const searchHashtag = await page.waitForSelector('input[data-testid=SearchBox_Search_Input]');
await searchHashtag.click();
console.log('selecting search bar');

await page.keyboard.type('#MAGA');
await page.keyboard.press('Enter');
console.log('did the search work?');

//from here down 
//follow code found from 
//https://github.com/tombaranowicz/twitter-bot-javascript/commit/0a455b547ad090f7598ed64f4e88c6e4ec71766e

let authorsSet = new Set()
try {
    let previousHeight;
    for (let i = 0; i < 10; i++) {
        const elementHandles = await page.$$('a.css-4rbku5.css-18t94o4.css-1dbjc4n.r-sdzlij.r-1loqt21.r-1adg3ll.r-ahm1il.r-1udh08x.r-o7ynqc.r-6416eg.r-13qz1uu');
        const propertyJsHandles = await Promise.all(
          elementHandles.map(handle => handle.getProperty('href'))
        );
        const urls = await Promise.all(
          propertyJsHandles.map(handle => handle.jsonValue())
        );

        urls.forEach(item => authorsSet.add(item))

        previousHeight = await page.evaluate('document.body.scrollHeight');
        await page.evaluate('window.scrollTo(0, document.body.scrollHeight)');
        await page.waitForFunction(`document.body.scrollHeight > ${previousHeight}`);
        await page.waitFor(1000);
    }
} catch(e) {console.log(e); }

console.log("-----")
console.log(authorsSet);
/*
// VISIT ALL AUTHORS AND CLICK FOLLOW BUTTON
const urls = Array.from(authorsSet)
for (let i = 0; i < urls.length; i++) {
  try {
    const url = urls[i];
    console.log(url);
    await page.goto(`${url}`);

    await page.waitFor(1000)
    await page.click('div[class="css-18t94o4 css-1dbjc4n r-1niwhzg r-p1n3y5 r-sdzlij r-1phboty r-rs99b7 r-1w2pmg r-1vuscfd r-1dhvaqw r-1fneopy r-o7ynqc r-6416eg r-lrvibr"]')
    await page.waitFor(1000)
    await page.goBack();
  }
  catch(error) {
    console.error(error);
  }
}

*/