FROM node:18-alpine

# Create app directory
WORKDIR /usr/src/app

# Install dependencies first (for faster builds)
COPY package*.json ./
RUN npm install

# Copy the rest of your code
COPY . .

# Build TypeScript to JavaScript
RUN npm run build

EXPOSE 3000

# Start the application
CMD [ "npm", "start" ]