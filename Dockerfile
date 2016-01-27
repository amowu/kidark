FROM node:5.3.0
ADD . /amowu.com
WORKDIR /amowu.com
RUN npm install
RUN npm rebuild node-sass
EXPOSE 8000
CMD NODE_ENV=production node src/server
