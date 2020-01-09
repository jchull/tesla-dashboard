FROM node:12-alpine


# Create app directory
#RUN mkdir -m777 -p /usr/app
WORKDIR /usr/app
#ENV PATH /usr/app/node_modules/.bin:$PATH

RUN apk --no-cache add --virtual native-deps \
  g++ gcc libgcc libstdc++ linux-headers autoconf automake make nasm python git && \
  npm install --quiet node-gyp -g


# Install server dependencies and build
COPY server/package.json ./server/
COPY server/src ./server/src/
RUN cd server && yarn

# Install web app dependencies and build
COPY web/package.json ./web/
RUN cd web && yarn



COPY . .
#build
RUN cd server && yarn build
RUN cd web && yarn build

RUN apk del native-deps

WORKDIR /usr/app/server

CMD [ "yarn", "start:prod" ]
