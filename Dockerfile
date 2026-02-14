# ---- Build ----
FROM node:22-alpine AS build
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm ci
COPY . .

ARG STRAPI_URL=http://localhost:1337
RUN sed -i "s|http://localhost:1337|${STRAPI_URL}|g" src/environments/environment.prod.ts

RUN npm run build

# ---- Production ----
FROM nginx:alpine AS production

COPY --from=build /app/dist/angular-news-app/browser /usr/share/nginx/html

# SPA routing: redirect all requests to index.html
RUN printf 'server {\n\
  listen 3000;\n\
  root /usr/share/nginx/html;\n\
  index index.html;\n\
\n\
  location / {\n\
    try_files $uri $uri/ /index.html;\n\
  }\n\
}\n' > /etc/nginx/conf.d/default.conf

EXPOSE 3000

CMD ["nginx", "-g", "daemon off;"]
