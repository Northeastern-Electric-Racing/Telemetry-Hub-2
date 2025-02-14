# build the node application, required for serving step
ARG PROD
ARG BACKEND_URL
ARG MAP_ACCESS_TOKEN
FROM node:alpine AS Build
WORKDIR /usr/src/app
COPY package.json package-lock.json ./
RUN npm install
COPY . .

ARG PROD
ARG BACKEND_URL
ARG MAP_ACCESS_TOKEN

# Create the environment.ts file with the required content
RUN echo "export const environment = {" > src/environment/environment.ts \
    && echo "  production: ${PROD}," >> src/environment/environment.ts \
    && echo "  url: '${BACKEND_URL}'," >> src/environment/environment.ts \
    && echo "  mapbox: {" >> src/environment/environment.ts \
    && echo "    accessToken: '${MAP_ACCESS_TOKEN}'" >> src/environment/environment.ts \
    && echo "  }" >> src/environment/environment.ts \
    && echo "};" >> src/environment/environment.ts

RUN npm run build:production

# Use official nginx image as the base image
FROM nginx:latest as Production

# Set the working directory
WORKDIR /usr/local/app

# copy dist
COPY --from=Build /usr/src/app/dist/angular-client/browser /usr/share/nginx/html

RUN rm /etc/nginx/conf.d/default.conf

COPY --from=Build /usr/src/app/nginx.conf /etc/nginx/conf.d

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]