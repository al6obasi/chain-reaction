const { CustomError } = require('./Errors')

/**
 * Logs the error to the console.
 * @param {Error} err - The error object to log.
 */
function logError(err) {
    console.error(err)
}

/**
 * Returns an error response to the client with the specified error object.
 * @param {Error} error - The error object to send in the response.
 * @param {http.IncomingMessage} _req - The HTTP request object (not used in this function).
 * @param {http.ServerResponse} res - The HTTP response object.
 */
function returnError(error, _req, res) {
    const statusCode = error.statusCode || 500
    const message = error.message || 'Internal server error'

    res.writeHead(statusCode, {
        'Content-Type': 'application/json',
    })

    res.end(
        JSON.stringify({
            ...error,
            message,
            statusCode,
        }),
    )
}

/**
 * Checks if the error is an operational error (instance of BaseError).
 * @param {Error} error - The error object to check.
 * @returns {boolean} True if the error is an operational error, false otherwise.
 */
function isOperationalError(error) {
    return (
        error instanceof CustomError && error.isOperational
    )
}

module.exports = {
    logError,
    returnError,
    isOperationalError,
}
