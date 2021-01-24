# Teslapp API server

# Build
FROM node:12-alpine as build-server
ENV NODE_ENV=production
ENV PATH /app/node_modules/.bin:$PATH

#COPY package.json /app/
#COPY package-lock.json /app/
#COPY lerna.json /app/
#
#COPY packages/alice/package.json /home/app/packages/alice/
#COPY packages/alice/package-lock.json /home/app/packages/alice/
#
#COPY packages/common/package.json /home/app/packages/common/
#COPY packages/common/package-lock.json /home/app/packages/common/
#
#RUN npm ci --ignore-scripts --production --no-optional
#RUN npx lerna bootstrap --hoist --ignore-scripts -- --production --no-optional

# build server
WORKDIR /app
COPY package.json /app/package.json
RUN yarn --silent
COPY . /app
RUN yarn build

# production environment
FROM node:12-alpine
COPY --from=build-server /app/dist /app/dist
EXPOSE 80
CMD ["node", "dist/main"]
