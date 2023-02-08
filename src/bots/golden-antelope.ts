import { unsplashSchedule } from '../modules/schedule'

export interface UnsplashConfig {
	themes: string[]
}

export const goldenAntelope = () => {
	const config: UnsplashConfig = {
		themes: ['thailand', 'asia', 'phuket', 'city', 'travel'],
	}

	unsplashSchedule(config)
}
