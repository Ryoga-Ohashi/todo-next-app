FROM node:20-alpine

WORKDIR /nextjs

COPY . .

RUN npm install
RUN npm install uuid
RUN npm i --save-dev @types/uuid
RUN npm run build

CMD ["npm", "start"]
