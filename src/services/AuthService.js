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
     * Verifies the validity of a JSON Web Token (JWT) using the provided secret key.
     * @param {string} token - The JSON Web Token to be verified.
     * @param {string} secretKey - The secret key used for verifying the token.
     * @returns {Object} The decoded payload if the token is valid.
     * @throws {UnauthorizedError} If the token is invalid or has expired.
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
     * @returns {Promise<string>} A promise that resolves to the hashed password.
     */
    async hashPassword(password) {
        const saltRounds = 10
        return bcrypt.hash(password, saltRounds)
    }

    /**
     * Compare a plaintext password with a hashed password.
     * @param {string} plaintextPassword - The plaintext password to be compared.
     * @param {string} hashedPassword - The hashed password stored in the database.
     * @returns {Promise<boolean>} Returns a promise that resolves to a boolean indicating whether the passwords match.
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
     * Validates the email address.
     * @param {string} email - The email address to validate.
     * @returns {boolean} Returns true if the email is valid, otherwise false.
     */
    isValidEmail(email) {
        const emailRegex =
            /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
        return emailRegex.test(email)
    }

    /**
     * Validates the password.
     * @param {string} password - The password to validate.
     * @returns {boolean} Returns true if the password is valid, otherwise false.
     */
    isValidPassword(password) {
        /**
         *
         *
         *   Explanation of the regular expression:
         *
         * ^: Start of the string.
         * (?=.*[a-z]): Positive lookahead to check for at least one lowercase letter.
         * (?=.*[A-Z]): Positive lookahead to check for at least one uppercase letter.
         * (?=.*\d): Positive lookahead to check for at least one digit.
         * (?=.*[@$!%*?&]): Positive lookahead to check for at least one special character. We can customize the special characters inside the square brackets to fit our needs.
         * [A-Za-z\d@$!%*?&]{8,}: Match a string that contains at least 8 characters from the given character classes (lowercase letters, uppercase letters, digits, and special characters).
         * $: End of the string.
         */

        const passwordRegex =
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/

        return passwordRegex.test(password)
    }
}

// Create and export the singleton instance
module.exports = new AuthService()
