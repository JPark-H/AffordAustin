FROM node:12-alpine
RUN apk add --no-cache git curl openssh
COPY ./package* .
RUN npm ci
# WORKDIR /Users/sabibi/Desktop/s2022/cs373/cs373-website
# COPY . .
# RUN npm install
# CMD ["node", "src/index.js"]
# EXPOSE 3000