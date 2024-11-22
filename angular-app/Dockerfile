# Step 1: Build the Angular application
FROM node:16 AS build

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the Angular application source
COPY . .

# Build the Angular application
RUN npm run build --prod

# Step 2: Serve the Angular application using Nginx
FROM nginx:alpine

# Copy the Angular build output to the Nginx web directory
COPY --from=build /app/dist/angular-app /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]
