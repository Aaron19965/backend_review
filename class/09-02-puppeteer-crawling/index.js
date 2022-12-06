import puppeteer from "puppeteer";

async function startCrawling() {
    const browser = await puppeteer.launch({ handless: false });
    const page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 720 });
    await page.goto("https://www.goodchoice.kr/product/search/2"); // 해당 주소로 이동함
    await page.waitForTimeout(1000);

    for (let i = 2; i <= 10; i++) {
        const data = {};
        data.stage = await page.$eval(`#poduct_list_area > li:nth-child(${i}) > a > div > div.name > div > span`, (el) => el.textContent);
        data.location = await page.$eval(`#poduct_list_area > li:nth-child(${i}) > a > div > div.name > strong`, (el) => el.textContent);
        data.price = await page.$eval(`#poduct_list_area > li:nth-child(${i}) > a > div > div.price > div > p > b`, (el) => el.textContent);
        console.log(data);
    }

    // 작업이 끝났다면 브라우저를 닫아준다.
    await browser.close();
}

startCrawling();
