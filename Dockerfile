FROM node:8.9.0-alpine as builder

WORKDIR /app
COPY package.json package.json
COPY yarn.lock yarn.lock
RUN yarn
COPY . .
RUN npm run build

FROM node:8.9.0-alpine as test

WORKDIR /app
COPY --from=builder /app /app
#RUN npm test


FROM node:8.9.0-alpine

WORKDIR /app
EXPOSE 3000
CMD [ "node", "dist/main.js" ]
COPY --from=builder /app /app