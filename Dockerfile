# Use the official Node.js image.
# https://hub.docker.com/_/node
FROM node:18-alpine

# Install pnpm
RUN npm install -g pnpm

# Set the working directory
WORKDIR /app

# Copy package.json and pnpm-lock.yaml
COPY package.json pnpm-lock.yaml ./

# Install dependencies
RUN pnpm install

# Copy the rest of the application code
COPY . .

# Build the application (if needed)
RUN pnpm run build

# Expose the port the app runs on
EXPOSE 3000

# Run the application
CMD ["pnpm", "start"]
