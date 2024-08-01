FROM node:20-alpine

WORKDIR /nextjs

COPY . .

RUN npm install
RUN npm install uuid
RUN npm i --save-dev @types/uuid
RUN npm install antd --save
RUN npm run build
RUN npm install @ant-design/nextjs-registry --save

CMD ["npm", "start"]
