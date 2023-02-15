import { unsplashSchedule } from '../modules/schedule'

export interface UnsplashConfig {
	themes: string[],
	scheduleRepeats: number | "all",
	cron: string
}

export const goldenAntelope = () => {
	const config: UnsplashConfig = {
		themes: ['thailand', 'asia', 'phuket', 'city', 'travel', 'samui', 'bangkok', 'huahin'],
		scheduleRepeats: 1,
		cron: '0 */8 * * *'
	}

	unsplashSchedule(config)
}
