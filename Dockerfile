# Use the official Node.js image.
FROM node:18-alpine

# Install pnpm
RUN npm install -g pnpm

# Set the working directory
WORKDIR /app

# Copy only package files first
COPY package.json pnpm-lock.yaml ./

# Install ALL dependencies (including devDependencies)
RUN pnpm install --frozen-lockfile

# Copy necessary files
COPY . .

# Set NODE_ENV to production for the build
ENV NODE_ENV=production

# Build the application
RUN pnpm run build

# Clean up dev dependencies
RUN pnpm prune --prod

EXPOSE 3000

# Run the application
CMD ["pnpm", "start"]
