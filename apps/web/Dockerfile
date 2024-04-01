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

FROM nginx:alpine

COPY --from=build /app/dist /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]


