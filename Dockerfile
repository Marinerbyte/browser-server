FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install --production

COPY . .

# Fly.io expects app on 8080
EXPOSE 8080

CMD ["node", "index.js"]
