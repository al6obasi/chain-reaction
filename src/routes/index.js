const {
    logError,
    returnError,
} = require('../helpers/errorHandler.js')
const AuthController = require('../controllers/AuthController.js')
const AuthMiddleware = require('../middlewares/AuthMiddleware.js')
const { NotFoundError } = require('../helpers/Errors.js')
const PostController = require('../controllers/PostController.js')

/**
 * Class representing the route handler for different routes.
 * @class
 */
class RouteHandler {
    constructor() {
        this.routes = [
            {
                method: 'GET',
                path: '/',
                handler: this.handleRoot,
            },
            {
                method: 'POST',
                path: '/register',
                handler: this.handleRegister,
            },
            {
                method: 'POST',
                path: '/login',
                handler: this.handleLogin,
            },
            {
                method: 'GET',
                path: '/posts',
                handler: this.handleGetPosts,
            },
            {
                method: 'GET',
                path: '/post',
                handler: this.handleGetPost,
            },
            {
                method: 'POST',
                path: '/post',
                handler: this.handleCreatePost,
            },
            {
                method: 'PATCH',
                path: '/post',
                handler: this.handleUpdatePost,
            },
            {
                method: 'DELETE',
                path: '/post',
                handler: this.handleDeletePost,
            },
        ]
    }

    /**
     * Handles the root route.
     * @param {http.IncomingMessage} req - The HTTP request object.
     * @param {http.ServerResponse} res - The HTTP response object.
     */
    handleRoot(_req, res) {
        res.writeHead(200)
        res.end(
            JSON.stringify({ message: 'Hello, world!' }),
        )
    }

    /**
     * Handles the /register route.
     * @param {http.IncomingMessage} req - The HTTP request object.
     * @param {http.ServerResponse} res - The HTTP response object.
     */
    handleRegister(req, res) {
        AuthController.register(req, res)
    }

    /**
     * Handles the /login route.
     * @param {http.IncomingMessage} req - The HTTP request object.
     * @param {http.ServerResponse} res - The HTTP response object.
     */
    handleLogin(req, res) {
        AuthController.login(req, res)
    }

    /**
     * Handles the /posts route.
     * @param {http.IncomingMessage} req - The HTTP request object.
     * @param {http.ServerResponse} res - The HTTP response object.
     */
    handleGetPosts(req, res) {
        AuthMiddleware.authorize(req, res, () =>
            PostController.getAllPostsWithPagination(
                req,
                res,
            ),
        )
    }

    /**
     * Handles the /post route.
     * @param {http.IncomingMessage} req - The HTTP request object.
     * @param {http.ServerResponse} res - The HTTP response object.
     */
    handleGetPost(req, res) {
        AuthMiddleware.authorize(req, res, () =>
            PostController.getPostById(req, res),
        )
    }

    /**
     * Handles the /post route.
     * @param {http.IncomingMessage} req - The HTTP request object.
     * @param {http.ServerResponse} res - The HTTP response object.
     */
    handleCreatePost(req, res) {
        AuthMiddleware.authorize(req, res, () =>
            PostController.createPost(req, res),
        )
    }

    /**
     * Handles the /post route.
     * @param {http.IncomingMessage} req - The HTTP request object.
     * @param {http.ServerResponse} res - The HTTP response object.
     */
    async handleUpdatePost(req, res) {
        await AuthMiddleware.authorize(req, res, () =>
            PostController.updatePost(req, res),
        )
    }

    /**
     * Handles the /post route.
     * @param {http.IncomingMessage} req - The HTTP request object.
     * @param {http.ServerResponse} res - The HTTP response object.
     */
    handleDeletePost(req, res) {
        AuthMiddleware.authorize(req, res, () =>
            PostController.deletePost(req, res),
        )
    }

    /**
     * Handles the incoming request and dispatches it to the appropriate route handler.
     * @param {http.IncomingMessage} req - The HTTP request object.
     * @param {http.ServerResponse} res - The HTTP response object.
     */
    handleRequest(req, res) {
        let requestUrl = req.url.split('?')[0]
        requestUrl =
            requestUrl.split('/').length > 2
                ? `/${requestUrl.split('/')[1]}`
                : requestUrl
        // Set common response headers
        res.setHeader('Content-Type', 'application/json')

        const route = this.routes.find(
            (route) =>
                route.method === req.method &&
                route.path === requestUrl,
        )
        if (route) {
            route.handler(req, res)
        } else {
            // Handle unknown routes or not allowed method
            const error = new NotFoundError(
                'Route not found or not allowed method.',
            )
            logError(error)
            returnError(error, req, res)
        }
    }
}

// Create a single instance of the RouteHandler class
const routeHandler = new RouteHandler()

// Export the handleRequest method of the singleton instance
module.exports.handler =
    routeHandler.handleRequest.bind(routeHandler)
