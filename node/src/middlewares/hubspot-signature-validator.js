const SIGNATURE_HEADER = 'X-HubSpot-Signature'
const SIGNATURE_VERSION_HEADER = 'X-HubSpot-Signature-Version'
const hubspot = require('@hubspot/api-client')
const mysqlDbHelper = require('../helpers/mysql-db-helper')
const _ = require('lodash')

module.exports = async (req, res, next) => {
    try {
        const baseUrl = await mysqlDbHelper.getUrl()
        const webhooksUrl = `${baseUrl}${req.originalUrl}`
        const requestBody = _.isEmpty(req.body) ? '' : JSON.stringify(req.body)
        const signature = req.header(SIGNATURE_HEADER)
        const clientSecret = process.env.HUBSPOT_CLIENT_SECRET
        const signatureVersion = req.header(SIGNATURE_VERSION_HEADER)

        if (
            hubspot.Signature.isValid({
                signature: signature,
                clientSecret: clientSecret,
                requestBody: requestBody,
                signatureVersion: signatureVersion,
                url: webhooksUrl,
                method: req.method
            })
        )
            return next()
    } catch (e) {
        console.log(e)
    }

    next(new Error('Unauthorized webhook or error with request processing!'))
}
