FROM node:12-alpine

# Create app directory
#RUN mkdir -m777 -p /usr/app
WORKDIR /usr/app
#ENV PATH /usr/app/node_modules/.bin:$PATH





# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY server/package.json ./server/
RUN cd server && yarn install

COPY . .

WORKDIR /usr/app/server
# If you are building your code for production
# RUN npm ci --only=production
RUN yarn build

ENV PORT 3000
EXPOSE 3000

CMD [ "yarn", "start:prod" ]
