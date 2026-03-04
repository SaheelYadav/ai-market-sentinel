FROM node:20-alpine

WORKDIR /app

# Install required build tools for native modules (better-sqlite3)
RUN apk add --no-cache python3 make g++

COPY package*.json ./

# Install dependencies inside Linux container
RUN npm install

COPY . .

RUN npm run build

EXPOSE 5000

CMD ["node", "dist/index.js"]
