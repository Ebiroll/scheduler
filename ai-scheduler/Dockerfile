# Stage 1: Build the React frontend
FROM node:14 as build

WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the frontend code
COPY . .

# Build the React app
RUN npm run build

# Stage 2: Set up the Node.js environment for both frontend and backend
FROM node:14

WORKDIR /app

# Copy the built frontend from the previous stage
COPY --from=build /app/dist ./dist

# Copy package.json and package-lock.json
COPY package*.json ./

# Install production dependencies
RUN npm install --only=production

# Copy the backend code
COPY server.js ./

# Expose the port the app runs on
EXPOSE 3000

# Start the application
CMD ["node", "server.js"]