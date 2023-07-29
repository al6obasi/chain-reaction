/**
 * Represents a success response with data, message, and status code.
 */
class SuccessResponse {
    /**
     * Create a new instance of SuccessResponse.
     * @param {*} data - The data to include in the response.
     * @param {string} [message='Success'] - The success message.
     * @param {number} [status=200] - The HTTP status code of the response.
     */
    constructor(data, message = 'Success', status = 200) {
        this.data = data
        this.message = message
        this.status = status
    }

    /**
     * Convert the SuccessResponse object to a JSON representation.
     * @returns {Object} - The JSON representation of the success response.
     */
    toJSON() {
        return {
            success: true,
            data: this.data,
            message: this.message,
        }
    }
}

module.exports = SuccessResponse
