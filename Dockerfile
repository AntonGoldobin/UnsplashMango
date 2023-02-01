FROM node:16
ENV NODE_ENV=production
WORKDIR /usr/src/app

COPY package*.json ./
# RUN npm install -g chromedriver
RUN npm i

#Bundle app source
COPY . .

CMD ["npm", "start"]
