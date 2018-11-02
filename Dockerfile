FROM node:alpine

COPY . app/

WORKDIR /app/

RUN npm i

EXPOSE 3003

ENTRYPOINT ["npm", "start"]
