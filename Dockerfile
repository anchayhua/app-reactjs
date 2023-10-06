FROM node:18
WORKDIR /app-reactjs
COPY package.json .
RUN npm install
COPY . ./
EXPOSE 5000
CMD [ “npm”, “start” ]