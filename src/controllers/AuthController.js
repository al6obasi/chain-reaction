const {
    BadRequestError,
    ConflictError,
    InternalServerError,
    NotFoundError,
    UnauthorizedError,
} = require('../helpers/Errors.js')
const {
    isOperationalError,
    logError,
    returnError,
} = require('../helpers/errorHandler.js')
const AuthService = require('../services/AuthService.js')
const { Op } = require('sequelize')
const jwt = require('jsonwebtoken')
const { parseRequestBody } = require('../helpers/utils.js')
const {
    returnSuccess,
} = require('../helpers/successHandler.js')

class AuthController {
    constructor() {
        if (!AuthController.instance) {
            AuthController.instance = this
        }
        return AuthController.instance
    }

    /**
     * Handles user registration.
     * @param {http.IncomingMessage} req - The HTTP request object.
     * @param {http.ServerResponse} res - The HTTP response object.
     */
    async register(req, res) {
        try {
            // Extract user data from the request body
            const { email, username, password } =
                await parseRequestBody(req)

            if (!AuthService.isValidEmail(email)) {
                // Throw 400 Bad Request Error if the email is invalid
                throw new BadRequestError(
                    'Email is invalid',
                )
            }

            if (!AuthService.isValidPassword(password)) {
                // Throw 400 Bad Request Error if the password is invalid
                throw new BadRequestError(
                    'Password is invalid',
                )
            }

            // Check if the email or username already exists in the database
            const existingUser =
                await req.db.models.User.findOne({
                    where: {
                        [Op.or]: [{ email }, { username }],
                    },
                })

            if (existingUser) {
                // Throw 409 Conflict Error if email or username already exists
                throw new ConflictError(
                    'Email or username already exists',
                )
            }

            // Hash the password before saving it to the database
            const hashedPassword =
                await AuthService.hashPassword(password)

            // Create the new user
            const newUser = await req.db.models.User.create(
                {
                    email,
                    username,
                    password: hashedPassword,
                },
            )

            // Generate a JWT token for the newly registered user
            const token = jwt.sign(
                { id: newUser.id, email, username },
                process.env.JWT_SECRET,
                { expiresIn: '1h' }, // Token expiration time
            )

            // Return the token and user details in the response
            returnSuccess(
                {
                    user: {
                        id: newUser.id,
                        email,
                        username,
                    },
                    token,
                },
                'User registered successfully',
                req,
                res,
            )
        } catch (error) {
            // Log the error
            logError(error)

            if (isOperationalError(error)) {
                returnError(error, req, res)
            } else {
                // Return 500 Internal Server Error
                returnError(
                    new InternalServerError(
                        'Internal server error',
                    ),
                    req,
                    res,
                )
            }
        }
    }
    /**
     * Handles user login.
     * @param {http.IncomingMessage} req - The HTTP request object.
     * @param {http.ServerResponse} res - The HTTP response object.
     */
    async login(req, res) {
        try {
            // Extract user data from the request body
            const { email, password } =
                await parseRequestBody(req)

            // Check if the user exists in the database
            const user = await req.db.models.User.findOne({
                where: { email },
            })

            if (!user) {
                // Throw 404 Not Found Error if user not found
                throw new NotFoundError('User not found')
            }

            // Check if the password is correct
            const isPasswordValid =
                await AuthService.comparePasswords(
                    password,
                    user.password,
                )

            if (!isPasswordValid) {
                // Throw 401 Unauthorized Error if password is incorrect
                throw new UnauthorizedError(
                    'Incorrect password',
                )
            }

            // Generate a JWT token for the user
            const token = jwt.sign(
                {
                    id: user.id,
                    email: user.email,
                    username: user.username,
                },
                process.env.JWT_SECRET,
                { expiresIn: '1h' }, // Token expiration time
            )

            returnSuccess(
                {
                    user: {
                        id: user.id,
                        email: user.email,
                        username: user.username,
                    },
                    token,
                },
                'Login successful',
                req,
                res,
            )
        } catch (error) {
            // Log the error
            logError(error)

            if (isOperationalError(error)) {
                returnError(error, req, res)
            } else {
                // Return 500 Internal Server Error
                returnError(
                    new InternalServerError(
                        'Internal server error',
                    ),
                    req,
                    res,
                )
            }
        }
    }
}

module.exports = new AuthController()
