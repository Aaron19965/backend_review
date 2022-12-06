import puppeteer from "puppeteer";

async function startCrawling() {
    const browser = await puppeteer.launch({ handless: false });
    const page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 720 });
    await page.goto("https://finance.naver.com/item/sise.naver?code=005930"); // 네이버 금융
    await page.waitForTimeout(1000);

    // iframe 찾기
    const iframePage = await page.frames().find((iframe) => iframe.url().includes("/item/sise_day.naver?code=005930"));

    for (let i = 3; i <= 7; i++) {
        await page.waitForTimeout(3000);
        const myDate = await iframePage.$eval(`body > table.type2 > tbody > tr:nth-child(${i}) > td:nth-child(1) > span`, (el) => el.textContent);
        const myPrice = await iframePage.$eval(`body > table.type2 > tbody > tr:nth-child(${i}) > td:nth-child(2) > span`, (el) => el.textContent);
        console.log(`날짜: ${myDate}, 가격: ${myPrice}`);
    }

    // 작업이 끝났다면 브라우저를 닫아준다.
    await browser.close();
}

startCrawling();
