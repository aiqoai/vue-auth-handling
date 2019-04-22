FROM node:10.15.0


# install simple http server for serving static content
RUN npm install -g http-server
ENV APP_API_PATH 'http://172.31.16.37:4000/'

# make the 'app' folder the current working directory
WORKDIR /app

# copy both 'package.json' and 'package-lock.json' (if available)
COPY package*.json ./

# install project dependencies
RUN npm install

# copy project files and folders to the current working directory (i.e. 'app' folder)
COPY . .

# build app for production with minification
RUN npm run build

FROM nginx
RUN mkdir /app
COPY --from=0 /app/dist /app
COPY nginx/nginx-prd.conf /etc/nginx/nginx.conf

#EXPOSE 8080
#CMD [ "http-server", "dist" ]
