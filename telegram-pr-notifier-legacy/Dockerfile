# Use a specific version of the Node.js Alpine image for better reliability
FROM node:lts-alpine

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json (or yarn.lock)
COPY package*.json ./

# Install dependencies using npm
RUN npm install --production

# Copy the rest of your application's code
COPY . .

# Define the command to run your app using CMD which defines your runtime
CMD ["node", "server.js"]
