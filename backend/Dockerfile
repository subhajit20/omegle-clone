FROM node:20
WORKDIR /omegle-clone-backend
COPY . .

ENV PORT=1726
ENV port=8080

RUN npm install

EXPOSE 1726
EXPOSE 8080

CMD ["npm","run","dev"]