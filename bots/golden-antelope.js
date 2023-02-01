const unsplashSchedule = require('../modules/schedule');

const goldenAntelope = () => {
	const config = {
		themes: ['thailand', 'asia', 'phuket', 'city', 'travel']
	}
	
	unsplashSchedule(config)
}


module.exports = goldenAntelope;
