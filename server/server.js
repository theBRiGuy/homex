const express = require('express');
const cors = require('cors');
const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
const userAgents = require('user-agents');
puppeteer.use(StealthPlugin());

const urls = [
	'https://www.realtor.ca/real-estate/22985131/407-simcoe-st-newmarket-central-newmarket',
	'https://www.realtor.ca/real-estate/22994599/314-stewart-st-newmarket-gorham-college-manor',
	'https://www.realtor.ca/real-estate/23005482/169-chisholm-ave-toronto-woodbine-lumsden',
	'https://www.realtor.ca/real-estate/22979385/22-fontainbleau-dr-toronto-newtonbrook-west'
];

const run = (url) => {
	return new Promise(async (res, rej) => {
		try {
			const browser = await puppeteer.launch();
			const page = await browser.newPage();
			// await page.setUserAgent(userAgents.toString());
			// await page.solveRecaptchas();
			console.log('url is ', url);
			await page.goto(url);
			// await page.waitForSelector('#listingPrice');
			const jsonLDSel = 'script[type="application/ld+json"]';
			await page.waitForSelector(jsonLDSel);
			// const dataObj = {
			// 	price: await page.$eval('#listingPrice', (el) => el.innerHTML)
			// };
			// console.log('dataObj is ', dataObj);
			const pageData = {
				meta: await page.$eval(jsonLDSel, (el) => JSON.parse(el.innerHTML)),
				address: await page.$eval('#listingAddress', (el) => el.innerHTML),
				mls: await page.$eval('#listingMLSNum', (el) => el.innerHTML),
				price: await page.$eval('#listingPrice', (el) => el.innerHTML)
			};
			// const pageData = await page.evaluate(() => {
			// 	return window.dataLayer;
			// });
			// console.log('ev is', ev.dataLayer);
			// let returnedJSON = await page.$$eval('.search-grid__item', (items) => {
			// 	console.log('items is', items);
			// 	return items.map((item) => {
			// 		return {
			// 			id: item.getAttribute('data-product-number'),
			// 			title: item.querySelector(
			// 				'.range-revamp-header-section__title--small'
			// 			).innerHTML,
			// 			image: {
			// 				srcSet: item.querySelector('img').getAttribute('srcset')
			// 			}
			// 		};
			// 	});
			// });
			// console.log('returnedJSON is', returnedJSON);
			await browser.close();
			return res(pageData);
		} catch (e) {
			return rej(e);
		}
	});
};

const app = express();
app.use(cors());

app.get('/', function (req, res) {
	console.log(2);
	run(urls[Math.floor(Math.random() * urls.length + 1) - 1])
		.then((json) => {
			console.log(json);
			res.json(json);
		})
		.catch(console.error);
});

app.get('/:id', function (req, res) {
	console.log(1);
	if (/\d+/.test(req.params.id)) {
		run(urls[req.params.id - 1])
			.then((json) => {
				console.log(json);
				res.json(json);
			})
			.catch(console.error);
	} else {
		throw new Error('Invalid property ID');
	}
});

app.listen(4000, () =>
	console.log('Express Server Now Running On localhost:4000')
);

process.on('SIGINT', function () {
	console.log('\nGracefully shutting down from SIGINT (Ctrl-C)');
	// some other closing procedures go here
	process.exit(1);
});
