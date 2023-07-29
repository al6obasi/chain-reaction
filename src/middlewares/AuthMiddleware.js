const {
    isOperationalError,
    logError,
    returnError,
} = require('../helpers/errorHandler.js')

const AuthService = require('../services/AuthService.js')
const {
    UnauthorizedError,
} = require('../helpers/Errors.js')

/**
 * Singleton class for authorization middleware to check JWT token.
 * @class
 */
class AuthMiddleware {
    /**
     * Creates an instance of AuthMiddleware.
     */
    constructor() {
        if (AuthMiddleware.instance) {
            return AuthMiddleware.instance
        }

        this.authorize = this.authorize.bind(this)
        AuthMiddleware.instance = this
        return this
    }

    /**
     * Middleware to check authorization using JWT token.
     * @param {http.IncomingMessage} req - The HTTP request object.
     * @param {http.ServerResponse} res - The HTTP response object.
     * @param {Function} next - The next middleware function.
     */
    async authorize(req, res, next) {
        try {
            // Get the authorization header from the request
            const authorizationHeader =
                req.headers.authorization

            if (
                !authorizationHeader ||
                !authorizationHeader.startsWith('Bearer ')
            ) {
                throw new UnauthorizedError(
                    'Authorization header missing or invalid',
                )
            }

            // Extract the token from the header
            const token = authorizationHeader.split(' ')[1]

            try {
                const user = AuthService.verifyToken(
                    token,
                    process.env.JWT_SECRET,
                )
                // If the token is valid, we can set the user object on the request
                req.user = user

                next()
            } catch (error) {
                throw new UnauthorizedError(
                    'Expired or invalid token',
                )
            }
        } catch (error) {
            // Log the error
            logError(error)

            if (isOperationalError(error)) {
                returnError(error, req, res)
            } else {
                // Return 401 Unauthorized Error
                returnError(
                    new UnauthorizedError('Unauthorized'),
                    req,
                    res,
                )
            }
        }
    }
}

module.exports = new AuthMiddleware()
