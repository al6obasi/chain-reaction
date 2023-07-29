/* global Promise */

function generatePosts(count = 30) {
    const posts = []

    for (let i = 1; i <= count; i++) {
        const post = {
            content: `post ${i} content`,
            created_at: new Date(),
            title: `post${i}`,
            updated_at: new Date(),
            user_id: i < 15 ? 1 : 2,
        }
        posts.push(post)
    }

    return posts
}

function parseRequestBody(req) {
    return new Promise((resolve, reject) => {
        let data = ''

        // Listen for the 'data' event to accumulate the incoming data
        req.on('data', (chunk) => {
            data += chunk.toString()
        })

        // Listen for the 'end' event to parse the accumulated data
        req.on('end', () => {
            try {
                const parsedBody = JSON.parse(data)
                resolve(parsedBody)
            } catch (error) {
                reject(error)
            }
        })

        // Listen for errors in reading the data
        req.on('error', (error) => {
            reject(error)
        })
    })
}

module.exports = { generatePosts, parseRequestBody }
