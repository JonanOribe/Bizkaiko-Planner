# Step 1: Build the Angular application
FROM node:16 AS build

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build --prod

# Step 2: Serve the Angular application with Express.js
FROM node:16 AS serve
WORKDIR /app
COPY --from=build /app .
RUN npm install
EXPOSE 8080
CMD ["ng serve"]
