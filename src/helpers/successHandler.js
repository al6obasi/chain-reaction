const SuccessResponse = require('../helpers/SuccessResponse.js')

/**
 * Helper function to send a success response.
 * @param {*} data - The data to be included in the success response.
 * @param {string} message - The success message.
 * @param {http.IncomingMessage} _req - The HTTP request object (unused in this function).
 * @param {http.ServerResponse} res - The HTTP response object.
 */
function returnSuccess(data, message, _req, res) {
    res.writeHead(201, {
        'Content-Type': 'application/json',
    })

    res.end(
        JSON.stringify(new SuccessResponse(data, message)),
    )
}

module.exports = { returnSuccess }
