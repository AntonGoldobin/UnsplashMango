var cron = require('node-schedule')
const unsplashClick = require('./unsplash-click')

const unsplashSchedule = (config) => {
	let scheduleIndex = 0;


	cron.scheduleJob('0 */12 * * *', function () {
		console.log('iteration has been started')
		unsplashClick(config.themes[scheduleIndex%config.themes.length])
		scheduleIndex++
	})
}

module.exports = unsplashSchedule;
