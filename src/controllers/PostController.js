const {
    BadRequestError,
    InternalServerError,
    NotFoundError,
    UnauthorizedError,
} = require('../helpers/Errors.js')
const {
    DEFAULT_LIMIT_NUMBER,
    DEFAULT_PAGE_NUMBER,
    DEFAULT_SORT_BY_COLUMN,
    DEFAULT_SORT_ORDER,
} = require('../constants/index.js')

const {
    isOperationalError,
    logError,
    returnError,
} = require('../helpers/errorHandler.js')
const { parseRequestBody } = require('../helpers/utils.js')
const {
    returnSuccess,
} = require('../helpers/successHandler.js')

const url = require('url')

class PostController {
    constructor() {
        if (!PostController.instance) {
            PostController.instance = this
        }
        return PostController.instance
    }

    /**
     * Create a new post.
     * @param {http.IncomingMessage} req - The HTTP request object.
     * @param {http.ServerResponse} res - The HTTP response object.
     */
    async createPost(req, res) {
        try {
            const { title, content } =
                await parseRequestBody(req)

            const newPost = await req.db.models.Post.create(
                {
                    title,
                    content,
                    userId: req?.user?.id,
                },
            )

            return returnSuccess(
                newPost,
                'Post created successfully',
                req,
                res,
            )
        } catch (error) {
            logError(error)

            if (isOperationalError(error)) {
                returnError(error, req, res)
            } else {
                returnError(
                    new InternalServerError(
                        'Error creating post',
                    ),
                    req,
                    res,
                )
            }
        }
    }

    /**
     * Get all posts with pagination and sorting.
     * @param {http.IncomingMessage} req - The HTTP request object.
     * @param {http.ServerResponse} res - The HTTP response object.
     */
    async getAllPostsWithPagination(req, res) {
        try {
            // Get query parameters for pagination and sorting
            const parsedUrl = url.parse(req.url, true)
            const queryParams = parsedUrl.query
            const {
                page = DEFAULT_PAGE_NUMBER,
                limit = DEFAULT_LIMIT_NUMBER,
                sortBy = DEFAULT_SORT_BY_COLUMN,
                sortOrder = DEFAULT_SORT_ORDER,
            } = queryParams

            // Validate the query params
            if (isNaN(parseInt(page))) {
                throw new BadRequestError(
                    `Invalid query params page: ${page}. The allowed values are numbers.`,
                )
            }

            if (isNaN(parseInt(limit))) {
                throw new BadRequestError(
                    `Invalid query params limit: ${limit}. The allowed values are numbers.`,
                )
            }

            if (
                !['id', 'title', 'content'].includes(sortBy)
            ) {
                throw new BadRequestError(
                    `Invalid query params sortBy: ${sortBy}. The allowed values 'id', 'title' or 'content'.`,
                )
            }

            if (!['asc', 'desc'].includes(sortOrder)) {
                throw new BadRequestError(
                    `Invalid query params sortOrder: ${sortOrder}. The allowed values 'asc' or 'desc'.`,
                )
            }

            // Get all posts with sorting and pagination
            const { count, rows: posts } =
                await req.db.models.Post.findAndCountAll({
                    include: {
                        model: req.db.models.User,
                        as: 'user',
                        attributes: {
                            exclude: ['password'],
                        },
                    },
                    attributes: { exclude: ['userId'] },
                    order: [[sortBy, sortOrder]],
                    offset:
                        (parseInt(page) - 1) *
                        parseInt(limit),
                    limit: parseInt(limit),
                })

            return returnSuccess(
                {
                    posts,
                    total: count,
                    page: parseInt(page),
                    limit: parseInt(limit),
                },
                'Posts retrieved successfully',
                req,
                res,
            )
        } catch (error) {
            logError(error)

            if (isOperationalError(error)) {
                returnError(error, req, res)
            } else {
                returnError(
                    new InternalServerError(
                        'Error retrieving posts',
                    ),
                    req,
                    res,
                )
            }
        }
    }

    /**
     * Get a single post by ID.
     * @param {http.IncomingMessage} req - The HTTP request object.
     * @param {http.ServerResponse} res - The HTTP response object.
     */
    async getPostById(req, res) {
        try {
            const postId = parseInt(
                req.url.split('/').pop(),
            )
            if (isNaN(postId)) {
                throw new BadRequestError('Invalid post ID')
            }

            const post = await req.db.models.Post.findByPk(
                postId,
                {
                    include: {
                        model: req.db.models.User,
                        as: 'user',
                        attributes: {
                            exclude: ['password'],
                        },
                    },
                    attributes: { exclude: ['userId'] },
                },
            )
            if (!post) {
                throw new NotFoundError('Post not found')
            }

            return returnSuccess(
                post,
                'Post retrieved successfully',
                req,
                res,
            )
        } catch (error) {
            logError(error)

            if (isOperationalError(error)) {
                returnError(error, req, res)
            } else {
                returnError(
                    new InternalServerError(
                        'Error retrieving post',
                    ),
                    req,
                    res,
                )
            }
        }
    }

    /**
     * Update a post by ID.
     * @param {http.IncomingMessage} req - The HTTP request object.
     * @param {http.ServerResponse} res - The HTTP response object.
     */
    async updatePost(req, res) {
        try {
            const postId = parseInt(
                req.url.split('/').pop(),
            )
            if (isNaN(postId)) {
                throw new BadRequestError('Invalid post ID')
            }

            const { title, content } =
                await parseRequestBody(req)

            const post = await req.db.models.Post.findByPk(
                postId,
                {
                    include: {
                        model: req.db.models.User,
                        as: 'user',
                        attributes: {
                            exclude: ['password'],
                        },
                    },
                },
            )
            if (!post) {
                throw new NotFoundError('Post not found')
            }

            if (post.userId !== req.user.id) {
                throw new UnauthorizedError(
                    'Unathorized user',
                )
            }

            await post.update({ title, content })

            return returnSuccess(
                post,
                'Post updated successfully',
                req,
                res,
            )
        } catch (error) {
            logError(error)

            if (isOperationalError(error)) {
                returnError(error, req, res)
            } else {
                returnError(
                    new InternalServerError(
                        'Error updating post',
                    ),
                    req,
                    res,
                )
            }
        }
    }

    /**
     * Delete a post by ID.
     * @param {http.IncomingMessage} req - The HTTP request object.
     * @param {http.ServerResponse} res - The HTTP response object.
     */
    async deletePost(req, res) {
        try {
            const postId = parseInt(
                req.url.split('/').pop(),
            )
            if (isNaN(postId)) {
                throw new BadRequestError('Invalid post ID')
            }

            const post = await req.db.models.Post.findByPk(
                postId,
            )
            if (!post) {
                throw new NotFoundError('Post not found')
            }

            if (post.userId !== req.user.id) {
                throw new UnauthorizedError(
                    'Unathorized user',
                )
            }

            await post.destroy()

            return returnSuccess(
                null,
                'Post deleted successfully',
                req,
                res,
            )
        } catch (error) {
            logError(error)

            if (isOperationalError(error)) {
                returnError(error, req, res)
            } else {
                returnError(
                    new InternalServerError(
                        'Error deleting post',
                    ),
                    req,
                    res,
                )
            }
        }
    }
}

module.exports = new PostController()
