FROM node:16
ENV NODE_ENV=production
ENV NODE_PORT=8000
# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json /usr/src/app/
RUN npm config set registry http://registry.npmjs.org/
RUN npm install -g tslint typescript
RUN npm install -g ts-node
RUN npm install --save-dev
RUN npm set registry=https://registry.npmjs.org/
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . /usr/src/app/

CMD ["npm", "start"]
