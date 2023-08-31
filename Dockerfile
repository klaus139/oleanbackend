# Use the official Node.js image as the base image
FROM node:18-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json (if you're using npm) to the container
COPY package*.json ./


# Install dev dependencies for TypeScript compilation
RUN npm install

# Copy the rest of the app source code to the container
COPY . .


# Expose the port on which your Node.js app will run
EXPOSE 5000


# Start the Node.js app
CMD ["node", "dist/index.js"] 