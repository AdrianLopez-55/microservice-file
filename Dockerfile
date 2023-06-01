# Use the official Node.js 14 image as the base image
FROM node:14

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and package-lock.json files to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the entire project directory to the container
COPY . .

# Set the environment variable for the application port
ENV PORT_APPLICATION=3200

# Expose the port specified in the environment variable
EXPOSE ${PORT_APPLICATION}

# Start the application
CMD [ "npm", "start" ]
