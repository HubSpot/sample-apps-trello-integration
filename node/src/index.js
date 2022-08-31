require('./config')
const Promise = require('bluebird')
const path = require('path')
const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const ngrok = require('ngrok')
const mysqlDbHelper = require('./helpers/mysql-db-helper')
const checkEnvironmentMiddleware = require('./middlewares/check-environment')
const oauthController = require('./controllers/oauth-controller')
const extensionInitController = require('./controllers/extension-init-controller')
const trelloCardsController = require('./controllers/trello-cards-controller')
const mappingsController = require('./controllers/mappings-controller')
const handleError = require('./helpers/error-handler-helper')
const PORT = 3000
const NGROK_AUTHTOKEN = process.env.NGROK_AUTHTOKEN

const releaseConnections = (server) => {
    mysqlDbHelper.close()
    return server.close(() => {
        console.log('Process terminated')
    })
}

const app = express()

app.use(morgan(':method :url :response-time'))
app.use(express.static('public'))

app.set('view engine', 'pug')
app.set('views', path.join(__dirname, 'views'))

app.use(
    bodyParser.urlencoded({
        limit: '50mb',
        extended: true,
    }),
)

app.use(
    bodyParser.json({
        limit: '50mb',
        extended: true,
    }),
)

app.use(checkEnvironmentMiddleware)

app.get('/', async (req, res) => {
    res.redirect('/init/extension')
})

app.get('/error', (req, res) => {
    res.render('error', { error: req.query.msg })
})

app.use('/oauth', oauthController.getRouter())
app.use('/init', extensionInitController.getRouter())
app.use('/trello/cards', trelloCardsController.getRouter())
app.use('/mappings', mappingsController.getRouter())

app.use((error, req, res, next) => {
    handleError(error, res)
})
;(async () => {
    try {
        await mysqlDbHelper.init()
        const server = app.listen(PORT, () => {
            console.log(`Listening on port: ${PORT}`)
            return Promise.delay(100)
                .then(() => ngrok.connect({addr: PORT, authtoken: NGROK_AUTHTOKEN }))
                .tap((url) => console.log('Use %s to connect to this application.', url))
                .tap((url) => console.log('Please update your app to use %s/auth/hubspot/oauth-callback as Redirect URL.', url))
                .then(mysqlDbHelper.saveUrl)
                .catch(async (e) => {
                    console.log('Error during app start. ', e)
                    return releaseConnections(server)
                })
        })

        process.on('SIGTERM', () => releaseConnections(server))
    } catch (e) {
        console.error('Error during app start. ', e)
    }
})()
