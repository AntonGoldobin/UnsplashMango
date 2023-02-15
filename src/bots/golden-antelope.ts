import { unsplashSchedule } from '../modules/schedule'

export interface UnsplashConfig {
	themes: string[],
	scheduleRepeats: number | "all"
}

export const goldenAntelope = () => {
	const config: UnsplashConfig = {
		themes: ['thailand', 'asia', 'phuket', 'city', 'travel'],
		scheduleRepeats: 1,
	}

	unsplashSchedule(config)
}
