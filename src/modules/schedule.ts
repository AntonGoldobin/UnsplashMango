import * as cron from 'node-schedule'
import { unsplashClick } from './unsplash-click'
import { UnsplashConfig } from '../bots/golden-antelope'

export const unsplashSchedule = (config: UnsplashConfig) => {
	let scheduleIndex = 0

	cron.scheduleJob('0 0 */8 * * *', () => {
		console.log('iteration has been started')
		unsplashClick(config.themes[scheduleIndex % config.themes.length])
		scheduleIndex++
	})
}
