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

# Copy environment variables from secrets in production
CMD if [ -f /etc/secrets/.env ]; then cp /etc/secrets/.env .env; fi && \
    PORT=${PORT:-10000} pnpm run build && \
    pnpm prune --prod && \
    PORT=${PORT:-10000} pnpm start
