FROM node:10.15.3-alpine as builder

STOPSIGNAL SIGTERM
RUN apk --no-cache add g++ gcc libgcc libstdc++ linux-headers make python git
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
RUN npm install --quiet node-gyp -g
COPY package*.json ./
RUN npm ci
COPY . .
RUN PUBLIC_URL=/ npm run build

FROM nginx:1.15.9-alpine as app

RUN rm -rf /usr/share/nginx/html/*
COPY --from=builder /usr/src/app/build /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]