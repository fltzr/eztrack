# docker build -f apps/web/Dockerfile -t web .
FROM node:lts-alpine as build

WORKDIR /app
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

RUN corepack enable

COPY package.json ./
COPY pnpm-lock.yaml ./
RUN --mount=type=cache,target=/pnpm/store pnpm i --frozen-lockfile
COPY . ./
RUN NODE_ENV=production pnpm exec nx run web:build

# Production stage
FROM nginx:alpine

COPY --from=build /app/dist /usr/share/nginx/html
COPY ./apps/web/nginx.conf /etc/nginx/nginx.conf

RUN mkdir /etc/nginx/certs

COPY ./certs/localhost+2.pem /etc/ssl/certs/localhost+2.pem
COPY ./certs/localhost+2-key.pem /etc/ssl/certs/private/localhost+2-key.pem

# RUN chown -R nginx:nginx /usr/share/nginx/html && \
#     chown nginx:nginx /etc/nginx/nginx.conf && \
#     chown nginx:nginx /etc/nginx/mime.types && \
#     chown -R nginx:nginx /etc/nginx/certs && \
#     chown -R nginx:nginx /var/logs/nginx && \
#     chmod 644 /etc/nginx/certs/localhost+2.pem && \
#     chmod 600 /etc/nginx/certs/localhost+2-key.pem

# USER nginx

# When actually moving to production,
# Replace with `EXPOSE 80 443`
EXPOSE 443

CMD ["nginx", "-g", "daemon off;"]

