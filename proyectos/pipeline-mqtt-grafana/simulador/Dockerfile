FROM node:22-alpine
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --omit=dev
COPY publicador.js energia-core.js ./
USER node
CMD ["node", "publicador.js"]
