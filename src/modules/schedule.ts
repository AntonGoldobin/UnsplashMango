import * as cron from 'node-schedule'
import { unsplashClick } from './unsplash-click'
import { UnsplashConfig } from '../bots/golden-antelope'

export const unsplashSchedule = (config: UnsplashConfig) => {
	let scheduleIndex = 0

	cron.scheduleJob(config.cron, () => {
		console.log('iteration has been started')
		if(config.scheduleRepeats === "all" || scheduleIndex < config.scheduleRepeats) {
			unsplashClick(config.themes[scheduleIndex % config.themes.length])
		}
		scheduleIndex++
	})
}
