const { HTTP_STATUS_CODES } = require('../constants')

/**
 * Custom base error class that extends the Error class.
 * Used as the base class for all other custom error classes.
 */
class CustomError extends Error {
    /**
     * Create a new CustomError instance.
     * @param {string} name - The name of the error.
     * @param {number} statusCode - The HTTP status code associated with the error.
     * @param {boolean} isOperational - Indicates if the error is operational (true) or programmer error (false).
     * @param {string} description - A description of the error.
     */
    constructor(
        name,
        statusCode,
        isOperational,
        description,
    ) {
        super(description)

        Object.setPrototypeOf(this, new.target.prototype)
        this.name = name
        this.statusCode = statusCode
        this.isOperational = isOperational
        Error.captureStackTrace(this)
    }
}

/**
 * Custom error class for Bad Request (400) errors.
 */
class BadRequestError extends CustomError {
    /**
     * Create a new BadRequestError instance.
     * @param {string} name - The name of the error.
     * @param {number} statusCode - The HTTP status code associated with the error (default: 400).
     * @param {string} description - A description of the error (default: 'Bad request').
     * @param {boolean} isOperational - Indicates if the error is operational (true) or programmer error (false) (default: true).
     */
    constructor(
        name,
        statusCode = HTTP_STATUS_CODES.BAD_REQUEST,
        description = 'Bad request',
        isOperational = true,
    ) {
        super(name, statusCode, isOperational, description)
    }
}

/**
 * Custom error class for Not Found (404) errors.
 */
class NotFoundError extends CustomError {
    /**
     * Create a new NotFoundError instance.
     * @param {string} name - The name of the error.
     * @param {number} statusCode - The HTTP status code associated with the error (default: 404).
     * @param {string} description - A description of the error (default: 'Not found').
     * @param {boolean} isOperational - Indicates if the error is operational (true) or programmer error (false) (default: true).
     */
    constructor(
        name,
        statusCode = HTTP_STATUS_CODES.NOT_FOUND,
        description = 'Not found',
        isOperational = true,
    ) {
        super(name, statusCode, isOperational, description)
    }
}

/**
 * Custom error class for Conflict (409) errors.
 */
class ConflictError extends CustomError {
    /**
     * Create a new ConflictError instance.
     * @param {string} name - The name of the error.
     * @param {number} statusCode - The HTTP status code associated with the error (default: 409).
     * @param {string} description - A description of the error (default: 'Conflict').
     * @param {boolean} isOperational - Indicates if the error is operational (true) or programmer error (false) (default: true).
     */
    constructor(
        name,
        statusCode = HTTP_STATUS_CODES.CONFLICT,
        description = 'Conflict, resource already exists',
        isOperational = true,
    ) {
        super(name, statusCode, isOperational, description)
    }
}

/**
 * Custom error class for Internal Server Error (500) errors.
 */
class InternalServerError extends CustomError {
    /**
     * Create a new InternalServerError instance.
     * @param {string} name - The name of the error.
     * @param {number} statusCode - The HTTP status code associated with the error (default: 500).
     * @param {string} description - A description of the error (default: 'Server error').
     * @param {boolean} isOperational - Indicates if the error is operational (true) or programmer error (false) (default: true).
     */
    constructor(
        name,
        statusCode = HTTP_STATUS_CODES.INTERNAL_SERVER,
        description = 'Internal Server error',
        isOperational = true,
    ) {
        super(name, statusCode, isOperational, description)
    }
}

/**
 * Custom error class for Internal Server Error (500) errors.
 */
class UnauthorizedError extends CustomError {
    /**
     * Create a new UnauthorizedError instance.
     * @param {string} name - The name of the error.
     * @param {number} statusCode - The HTTP status code associated with the error (default: 401).
     * @param {string} description - A description of the error (default: 'Unauthorized').
     * @param {boolean} isOperational - Indicates if the error is operational (true) or programmer error (false) (default: true).
     */
    constructor(
        name,
        statusCode = HTTP_STATUS_CODES.UNAUTHORIZED,
        description = 'Unauthorized',
        isOperational = true,
    ) {
        super(name, statusCode, isOperational, description)
    }
}

module.exports = {
    CustomError,
    BadRequestError,
    NotFoundError,
    ConflictError,
    InternalServerError,
    UnauthorizedError,
}
