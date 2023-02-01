require('chromedriver')
const { Builder, Browser, By, Key, until } = require('selenium-webdriver')
const chrome = require('selenium-webdriver/chrome');

var dotenv = require('dotenv')
dotenv.config()

const timer = (ms) => new Promise((res) => setTimeout(res, ms))

const unsplashClick = async (theme) => {
	console.log('current theme: ' + theme)

	// .addExtensions(new File("/path/to/extension.crx")

	let driver = await new Builder()
		.forBrowser('chrome')
		.setChromeService(
			new chrome.ServiceBuilder('/usr/src/app/chromedriver/chromedriver'),
		)
		.build()

	var width = 600
	var height = 600

	driver.manage().window().setRect({ x: 0, y: 0, width: width, height: height })

	try {
		await driver.get('https://unsplash.com/login')
		await driver.wait(
			until.elementIsVisible(driver.findElement(By.name('commit'))),
			5000,
		)
		await driver
			.findElement(By.name('user[email]'))
			.sendKeys(process.env.UNSPLASH_LOGIN)
		await driver
			.findElement(By.name('user[password]'))
			.sendKeys(process.env.UNSPLASH_PW, Key.RETURN)
		await driver.get(`https://unsplash.com/s/photos/${theme}?order_by=latest`)
		await driver.wait(
			until.elementLocated(By.xpath('//button[contains(@title, "Like")]')),
			5000,
		)
		const likesList = await driver.findElements(
			By.xpath("//button[@title='Like']"),
		)

		for await (const like of likesList) {
			// like.sendKeys(Key.RETURN)
			console.log('button has been clicked')
			await timer(3000)
		}
	} finally {
		await driver.quit()
	}
}
module.exports = unsplashClick
