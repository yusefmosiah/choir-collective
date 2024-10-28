# Use the official Node.js image.
FROM node:18-alpine

# Install pnpm
RUN npm install -g pnpm

# Set the working directory
WORKDIR /app

# Set NODE_OPTIONS to limit memory usage during build
ENV NODE_OPTIONS="--max_old_space_size=450"
ENV NODE_ENV=production

# Copy package files first
COPY package.json pnpm-lock.yaml ./
COPY next.config.mjs tsconfig.json .npmrc ./
COPY postcss.config.mjs tailwind.config.ts ./

# Install production dependencies only
RUN pnpm install --prod --frozen-lockfile

# Copy source files
COPY src ./src
COPY public ./public
COPY anchor ./anchor

# Build with production optimization
RUN pnpm run build

# Run the application
CMD PORT=${PORT:-10000} pnpm start
