const express = require('express');
const cors = require('cors');
const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
const userAgents = require('user-agents');
puppeteer.use(StealthPlugin());

const properties = [
	{
		url:
			'https://www.realtor.ca/real-estate/23025701/87-frater-ave-toronto-danforth-village-east-york',
		comps: [990000, 995000, 997000, 1000000, 1025000],
		solds: [
			{ list: 990000, sold: 1000000 },
			{ list: 1059000, sold: 1030000 },
			{ list: 1100000, sold: 1050000 },
			{ list: 995000, sold: 900000 },
			{ list: 999000, sold: 1050000 }
		]
	},
	{
		url:
			'https://www.realtor.ca/real-estate/23034407/321-dowson-loop-newmarket-woodland-hill',
		comps: [899000, 1015000, 1050000],
		solds: [
			{ list: 999000, sold: 1000000 },
			{ list: 899000, sold: 899000 },
			{ list: 1190000, sold: 1200000 }
		]
	}
];

const run = (property) => {
	return new Promise(async (res, rej) => {
		try {
			const browser = await puppeteer.launch();
			const page = await browser.newPage();
			// await page.setUserAgent(userAgents.toString());
			// await page.solveRecaptchas();
			console.log('property.url is ', property.url);

			await page.setUserAgent(
				'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36'
			);
			await page.goto(property.url);
			// await page.screenshot({ path: 'screenshot.png' });
			await page.waitForSelector('#listingPrice');
			const jsonLDSel = 'script[type="application/ld+json"]';
			await page.waitForSelector(jsonLDSel);
			// const dataObj = {
			// 	price: await page.$eval('#listingPrice', (el) => el.innerHTML)
			// };
			// console.log('dataObj is ', dataObj);

			const pageData = {
				meta: await page.$eval(jsonLDSel, (el) => JSON.parse(el.innerHTML)),
				address: await page.$eval('#listingAddress', (el) => el.innerHTML),
				mls: await page.$eval('#MLNumberVal', (el) => el.innerHTML),
				price: await page.$eval('#listingPrice', (el) => el.innerHTML),
				comps: property.comps,
				solds: property.solds,
				desc: await page.$eval('#propertyDescriptionCon', (el) => el.innerHTML),
				attributes: await page.$$eval(
					'.propertyDetailsSectionContentSubCon',
					(arr) => {
						return arr.map((el) => {
							const replaceLabel = (label) => {
								const replaceObj = {
									Total: 'Total Bathrooms',
									'Above Grade': 'Bedrooms Above Grade'
								};

								return replaceObj[label] ? replaceObj[label] : label;
							};

							return {
								label: replaceLabel(
									el.querySelector('.propertyDetailsSectionContentLabel')
										.innerHTML
								),
								value: el.querySelector('.propertyDetailsSectionContentValue')
									.innerHTML
							};
						});
					}
				),
				gallery: await page.$$eval('#listingPhotoCarousel a', (arr) => {
					return arr.map((a) => {
						return {
							full: a.getAttribute('href'),
							thumb: a.querySelector('img').getAttribute('src')
						};
					});
				})
			};
			await browser.close();
			return res(pageData);
		} catch (e) {
			return rej(e);
		}
	});
};

const app = express();
app.use(cors());

app.get('/:id', function (req, res) {
	console.log(`Will fetch ID=${req.params.id}`);
	if (/\d+/.test(req.params.id)) {
		run(properties[req.params.id - 1])
			.then((json) => {
				res.json(json);
			})
			.catch(console.error);
	} else {
		throw new Error('Invalid property ID');
	}
});

app.get('/', function (req, res) {
	console.log('Will fetch RANDOM ID');
	run(properties[Math.floor(Math.random() * properties.length + 1) - 1])
		.then((json) => {
			res.json(json);
		})
		.catch(console.error);
});

app.listen(4000, () =>
	console.log('Express Server Now Running On localhost:4000')
);

process.on('SIGINT', function () {
	console.log('\nGracefully shutting down server from SIGINT (Ctrl-C)');
	process.exit(1);
});
