FROM node:16-alpine as base

WORKDIR /src
COPY package*.json .

FROM base as development
EXPOSE 3000
COPY ./ ./
RUN npm i
CMD ["npm", "run", "start"]

FROM base AS builder
ENV NODE_ENV production
RUN npm ci
# Copy app files
COPY . .
# Build the app
RUN npm run build

# Bundle static assets with nginx
FROM nginx:1.21.0-alpine as production
ENV NODE_ENV production
# Copy built assets from builder
COPY --from=builder /src/build /usr/share/nginx/html
# Add your nginx.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf
# Expose port
EXPOSE 80
# Start nginx
CMD ["nginx", "-g", "daemon off;"]
