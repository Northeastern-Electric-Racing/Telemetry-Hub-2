# Use Node.js official image
FROM node:23

# Set working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json from root
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the full server directory
COPY server /app/server

# Copy Prisma directories
COPY local-prisma /app/local-prisma
COPY cloud-prisma /app/cloud-prisma

# Install Prisma globally
RUN npm install -g prisma

# Ensure `@prisma/client` is installed
RUN npm install @prisma/client --save-dev

# Expose the server port
EXPOSE 3000

# Set working directory to server before running scripts
WORKDIR /app/server

# ✅ Ensure Prisma Client is generated **before starting the server**
CMD ["sh", "-c", "npx prisma generate --schema=/app/local-prisma/schema.prisma && npx prisma generate --schema=/app/cloud-prisma/schema.prisma && npm start"]
