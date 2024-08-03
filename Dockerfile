# Use a base image that includes Node.js
FROM node:18-alpine

# Set the working directory in the container
WORKDIR /app

# Install dependencies
COPY package.json yarn.lock ./
RUN yarn install

# Copy the rest of your application code
COPY . .

# Expose the port that your app runs on
EXPOSE 3000

# Start the React development server
CMD ["yarn", "start"]
