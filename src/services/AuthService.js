/**
 * @fileoverview Singleton AuthService class for generating and verifying JSON Web Tokens (JWT).
 * @module services/auth
 */

const { UnauthorizedError } = require('../helpers/Errors')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

/**
 * AuthService class handles the generation and verification of JSON Web Tokens (JWT).
 * It ensures that only one instance of the class is created and provides a global point of access to that instance.
 */
class AuthService {
    /**
     * Creates a new instance of AuthService or returns the existing instance if it already exists.
     * @constructor
     */
    constructor() {
        if (!AuthService.instance) {
            AuthService.instance = this
        }

        return AuthService.instance
    }

    /**
     * Generates a new JSON Web Token (JWT) with the provided payload and secret key.
     * @param {Object} payload - The payload data to be encoded in the token.
     * @param {string} secretKey - The secret key used for signing the token.
     * @param {string|number} expiresIn - The expiration time for the token (e.g., '1d', '2h', 3600).
     * @returns {string} The generated JSON Web Token.
     */
    generateToken(payload, secretKey, expiresIn) {
        return jwt.sign(payload, secretKey, { expiresIn })
    }

    /**
     * Verifies the validity of a JSON Web Token (JWT) using the provided secret key.
     * @param {string} token - The JSON Web Token to be verified.
     * @param {string} secretKey - The secret key used for verifying the token.
     * @returns {Object} The decoded payload if the token is valid.
     * @throws {Error} If the token is invalid or has expired.
     */
    verifyToken(token, secretKey) {
        try {
            return jwt.verify(token, secretKey)
        } catch (error) {
            throw new UnauthorizedError('Invalid token')
        }
    }

    /**
     * Hashes the provided password using bcrypt.
     * @param {string} password - The password to be hashed.
     * @returns {Promise<string>} - A promise that resolves to the hashed password.
     */
    async hashPassword(password) {
        const saltRounds = 10
        return bcrypt.hash(password, saltRounds)
    }

    /**
     * Compare a plaintext password with a hashed password.
     * @param {string} plaintextPassword - The plaintext password to be compared.
     * @param {string} hashedPassword - The hashed password stored in the database.
     * @returns {Promise<boolean>} - Returns a promise that resolves to a boolean indicating whether the passwords match.
     */
    async comparePasswords(
        plaintextPassword,
        hashedPassword,
    ) {
        try {
            return bcrypt.compare(
                plaintextPassword,
                hashedPassword,
            )
        } catch (error) {
            // Handle any errors that occurred during password comparison
            console.error(
                'Error during password comparison:',
                error,
            )
            throw error
        }
    }

    /**
     * Validates an email address.
     * @param {string} email - The email address to validate.
     * @returns {boolean} - Returns true if the email is valid, otherwise false.
     */
    isValidEmail(email) {
        const emailRegex =
            /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
        return emailRegex.test(email)
    }
}

// Create and export the singleton instance
module.exports = new AuthService()
