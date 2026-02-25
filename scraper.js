const { chromium } = require('playwright');

async function scrapeAndSum() {
    const browser = await chromium.launch();
    const page = await browser.newPage();

    const seeds = [83, 84, 85, 86, 87, 88, 89, 90, 91, 92];
    let total = 0;

    for (const seed of seeds) {
        // Note: If the actual URL from the assignment differs, 
        // it was usually this exact format.
        const url = `https://sanand0.github.io/tdsdata/js_table/?seed=${seed}`;
        console.log(`Visiting ${url}`);
        await page.goto(url, { waitUntil: 'networkidle' });

        const numbers = await page.$$eval("table td", cells =>
            cells.map(c => parseFloat(c.innerText.replace(/,/g, ''))).filter(x => !isNaN(x))
        );

        let sum = 0;
        for (let num of numbers) {
            sum += num;
        }
        console.log(`Sum for seed ${seed}: ${sum}`);
        total += sum;
    }

    console.log(`Total Sum: ${total}`);
    await browser.close();
}

scrapeAndSum();
