import createError from 'http-errors'
import express, { Express, Request, Response, NextFunction } from 'express'
import * as dotenv from 'dotenv'
import * as path from 'path'
import cookieParser from 'cookie-parser'
import logger from 'morgan'
import { goldenAntelope } from './bots/golden-antelope'
import  * as pug  from 'pug'

import {router as indexRouter } from './routes/index'

interface Error {
	status?: number
	message?: string
}

dotenv.config()

const port = process.env.NODE_PORT || 3000
const app: Express = express()

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.set('views', path.join(__dirname, 'web/'));

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, '../public')))

app.use('/', indexRouter)

// catch 404 and forward to error handler
app.use((req: Request, res: Response, next: NextFunction) => {
	next(createError(404))
})

// error handler
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
	// set locals, only providing error in development
	res.locals.message = err.message
	res.locals.error = req.app.get('env') === 'development' ? err : {}

	// render the error page
	res.status(err.status || 500)
	res.render('error')
})

app.listen(port, () => {
	console.log(`Unsplash Like is listening on port ${port}`)
})

goldenAntelope()

module.exports = app
