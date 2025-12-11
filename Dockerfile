# Dockerfile (to be placed in project root)
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

EXPOSE 3001
ENV PORT=3001

CMD ["npm", "start"]