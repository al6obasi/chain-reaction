FROM node:lts-alpine

RUN apk add --no-cache bash git

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and yarn.lock to the container
COPY package.json yarn.lock ./

# Copy .default.env to the .env
COPY .default.env .env

# Run it using root user for task purpose
USER root


# Install app dependencies using yarn
RUN yarn install --frozen-lockfile


# Copy the rest of the application code to the container
COPY . .

# Expose our port  Node.js app is running on
EXPOSE 3000

# Start the Node.js application
CMD ["yarn", "start"]
