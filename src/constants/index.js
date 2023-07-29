/**
 * Default page number for pagination.
 * @constant {number}
 */
const DEFAULT_PAGE_NUMBER = 1

/**
 * Default number of items per page for pagination.
 * @constant {number}
 */
const DEFAULT_LIMIT_NUMBER = 10

/**
 * Default column to sort by.
 * @constant {string}
 */
const DEFAULT_SORT_BY_COLUMN = 'id'

/**
 * Default sorting order.
 * @constant {string}
 */
const DEFAULT_SORT_ORDER = 'asc'

/**
 * HTTP status codes used in the application.
 * @enum {number}
 */
const HTTP_STATUS_CODES = {
    OK: 200,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    NOT_FOUND: 404,
    CONFLICT: 409,
    INTERNAL_SERVER: 500,
}

module.exports = {
    DEFAULT_LIMIT_NUMBER,
    DEFAULT_PAGE_NUMBER,
    DEFAULT_SORT_BY_COLUMN,
    DEFAULT_SORT_ORDER,
    HTTP_STATUS_CODES,
}
