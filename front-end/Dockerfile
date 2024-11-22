# Step 1: Build the Angular application
FROM node:16 AS build

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the entire application to the working directory
COPY . .

# Build the Angular app
RUN npm run build

# Step 2: Serve the Angular application using Nginx
FROM nginx:alpine

# Copy the Angular build output to Nginx's web directory
COPY --from=build /front-end/dist/angular-app /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]
