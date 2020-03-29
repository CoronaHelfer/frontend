# build stage
FROM node:latest as build
WORKDIR /app
COPY package*.json ./
RUN npm install -g @quasar/cli
COPY . .
RUN npm install
RUN quasar build

# runtime stage
FROM nginx:stable-alpine
COPY --from=build /app/dist/spa /usr/share/nginx/html
