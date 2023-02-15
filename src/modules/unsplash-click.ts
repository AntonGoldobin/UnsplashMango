import 'chromedriver'
import {By, Key, until } from 'selenium-webdriver'

import webdriver from 'selenium-webdriver'
import chrome from 'selenium-webdriver/chrome'

const options = new chrome.Options()
options.addArguments('start-maximized') // open Browser in maximized mode
options.addArguments('disable-infobars') // disabling infobars
options.addArguments('--disable-extensions') // disabling extensions
options.addArguments('--disable-gpu') // applicable to windows os only
options.addArguments('--disable-dev-shm-usage') // overcome limited resource problems
options.addArguments('--no-sandbox') // Bypass OS security model
options.addArguments('--disable-features=VizDisplayCompositor')
// options.addArguments("--headless");

import * as dotenv from 'dotenv'
dotenv.config()

const timer = (ms: number) => new Promise((res) => setTimeout(res, ms))
const chromeServerUrl = process.env.CHROME_SERVER

export const unsplashClick = async (theme= 'thailand') => {
	console.log('current theme: ' + theme)

	const width = 600
	const height = 600

	const driver = await new webdriver.Builder()
		.forBrowser('chrome')
		.setChromeOptions(options)
		.usingServer(chromeServerUrl)
		// .usingServer("http://localhost:4444/wd/hub")
		.build()



	await driver
		.manage()
		.window()
		.setRect({ x: 0, y: 0, width, height })

	try {
		await console.log('start browsing')
		await driver.get('https://unsplash.com/login')
		await console.log('got login page')
		await driver.wait(
			until.elementIsVisible(driver.findElement(By.name('commit'))),
			5000,
		)
		await console.log('found commit element')
		await driver
			.findElement(By.name('user[email]'))
			.sendKeys(process.env.UNSPLASH_LOGIN)
		await console.log('found email input and filled')
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
			like.sendKeys(Key.RETURN)
			console.log('button has been clicked')
			await timer(3000)
		}
	} finally {
		await driver.quit()
	}
}
