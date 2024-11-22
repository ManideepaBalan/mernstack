# Use the latest official Node.js image
FROM node:latest

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Install nodemon globally
RUN npm install -g nodemon

# Copy the rest of your application code
COPY . .

# Expose the port your server runs on
EXPOSE 5000

# Command to run the server with nodemon for hot reloading
CMD ["nodemon", "server.js"]
