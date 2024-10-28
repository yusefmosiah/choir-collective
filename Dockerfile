# Use the official Node.js image.
FROM node:18-alpine

# Install pnpm
RUN npm install -g pnpm

# Set the working directory
WORKDIR /app

# Copy only package files first
COPY package.json pnpm-lock.yaml ./

# Install dependencies with specific flags for space efficiency
RUN pnpm install --frozen-lockfile --prod

# Copy necessary files
COPY . . 

# Build the application
RUN pnpm run build

EXPOSE 3000

# Run the application
CMD ["pnpm", "start"]
