FROM node:latest

#RUN mkdir /sharedServer
#ADD . /sharedServer
WORKDIR /sharedServer
COPY package.json .
RUN npm i

COPY . .
EXPOSE 3000
CMD ["npm", "start"]
