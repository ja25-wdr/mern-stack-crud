# Use Node.js version 18 as the base image
FROM node:22.11.0

# Set the working directory inside the container
WORKDIR /app

# Copy only the package.json file to the working directory
COPY package.json .

# Install dependencies based on the package.json file
RUN npm install

# Copy the entire application code to the working directory
COPY . .

# Expose port 3000 to allow external connections
EXPOSE 3000

# Define the command to run when the container starts
CMD ["npm", "start"]

