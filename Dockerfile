# Use the official Node.js image.
FROM node:18-alpine

# Install pnpm
RUN npm install -g pnpm

# Set the working directory
WORKDIR /app

# Copy only package files first
COPY package.json pnpm-lock.yaml ./

# Install dependencies with specific flags for space efficiency
RUN pnpm install --frozen-lockfile --prefer-offline

# Copy only necessary files
COPY next.config.mjs .
COPY tsconfig.json .
COPY src ./src
COPY public ./public
COPY postcss.config.mjs .
COPY tailwind.config.ts .
COPY anchor ./anchor

# Build the application
RUN pnpm run build

# Remove development dependencies
RUN pnpm prune --prod

EXPOSE 3000

# Run the application
CMD ["pnpm", "start"]
