# Use node 12.14.1 LTS
FROM node:12.14.1 as build-stage
ENV NODE_ENV=production
ENV HOST 0.0.0.0
RUN mkdir -p /app
COPY . /app
WORKDIR /app
RUN npm install cnpm -g
RUN cnpm install
RUN npm run build

EXPOSE 6888
CMD ["npm", "start"]
